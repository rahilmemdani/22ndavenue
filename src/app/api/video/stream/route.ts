import { NextRequest, NextResponse } from "next/server";
import { existsSync, createReadStream, createWriteStream, promises as fs } from "fs";
import { join } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";

const CACHE_DIR = join(process.cwd(), ".video-cache");

async function fetchDriveFile(id: string, userAgent: string, confirmToken?: string): Promise<Response> {
  const url = confirmToken
    ? `https://drive.google.com/uc?export=download&confirm=${confirmToken}&id=${id}`
    : `https://drive.google.com/uc?export=download&id=${id}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": userAgent,
    },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return new NextResponse("Missing file ID", { status: 400 });
  }

  try {
    // Ensure cache directory exists
    await fs.mkdir(CACHE_DIR, { recursive: true });

    const filePath = join(CACHE_DIR, id);
    const metaPath = join(CACHE_DIR, `${id}.json`);
    const tempPath = join(CACHE_DIR, `${id}.tmp`);

    // 1. Serve from cache if available
    if (existsSync(filePath) && existsSync(metaPath)) {
      const meta = JSON.parse(await fs.readFile(metaPath, "utf-8"));
      const contentType = meta.contentType || "video/mp4";
      const total = meta.contentLength;

      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Accept-Ranges", "bytes");
      headers.set("Cache-Control", "public, max-age=31536000, immutable");

      const rangeHeader = request.headers.get("range");
      if (rangeHeader && total) {
        const parts = rangeHeader.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
        const chunksize = end - start + 1;

        headers.set("Content-Range", `bytes ${start}-${end}/${total}`);
        headers.set("Content-Length", chunksize.toString());

        const nodeStream = createReadStream(filePath, { start, end });
        // @ts-ignore
        const webStream = Readable.toWeb(nodeStream);

        return new NextResponse(webStream as any, {
          status: 206,
          headers,
        });
      }

      headers.set("Content-Length", total.toString());
      const nodeStream = createReadStream(filePath);
      // @ts-ignore
      const webStream = Readable.toWeb(nodeStream);

      return new NextResponse(webStream as any, {
        status: 200,
        headers,
      });
    }

    // 2. Fetch from Google Drive and write to cache
    let driveResponse = await fetchDriveFile(id, request.headers.get("user-agent") || "");

    if (!driveResponse.ok) {
      return new NextResponse(`Drive error: ${driveResponse.statusText}`, {
        status: driveResponse.status,
      });
    }

    let contentType = driveResponse.headers.get("content-type") || "video/mp4";

    // Handle Google Drive virus warning page if encountered
    if (contentType.includes("text/html")) {
      const html = await driveResponse.text();
      const confirmMatch = html.match(/confirm=([a-zA-Z0-9_-]+)/) || html.match(/name="confirm"\s+value="([a-zA-Z0-9_-]+)"/);
      
      if (confirmMatch && confirmMatch[1]) {
        const confirmToken = confirmMatch[1];
        driveResponse = await fetchDriveFile(id, request.headers.get("user-agent") || "", confirmToken);
        
        if (!driveResponse.ok) {
          return new NextResponse(`Drive error after confirmation: ${driveResponse.statusText}`, {
            status: driveResponse.status,
          });
        }
        
        contentType = driveResponse.headers.get("content-type") || "video/mp4";
      } else {
        console.error(
          `Google Drive proxy error for ID ${id}: Returned HTML page instead of video.`
        );
        return new NextResponse(
          "Google Drive permissions error or file not found.",
          { status: 403 }
        );
      }
    }

    const responseStream = driveResponse.body;
    if (!responseStream) {
      return new NextResponse("Empty response body from Google Drive", { status: 500 });
    }

    // Write stream to temp path using pipeline
    // @ts-ignore
    const nodeReadable = Readable.fromWeb(responseStream);
    const writeStream = createWriteStream(tempPath);
    
    await pipeline(nodeReadable, writeStream);

    // Get the length of the written file
    const stats = await fs.stat(tempPath);
    const contentLength = stats.size;

    // Save metadata
    await fs.writeFile(
      metaPath,
      JSON.stringify({ contentType, contentLength }),
      "utf-8"
    );

    // Rename to final path
    await fs.rename(tempPath, filePath);

    // Serve the newly cached file
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    const rangeHeader = request.headers.get("range");
    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : contentLength - 1;
      const chunksize = end - start + 1;

      headers.set("Content-Range", `bytes ${start}-${end}/${contentLength}`);
      headers.set("Content-Length", chunksize.toString());

      const nodeStream = createReadStream(filePath, { start, end });
      // @ts-ignore
      const webStream = Readable.toWeb(nodeStream);

      return new NextResponse(webStream as any, {
        status: 206,
        headers,
      });
    }

    headers.set("Content-Length", contentLength.toString());
    const nodeStream = createReadStream(filePath);
    // @ts-ignore
    const webStream = Readable.toWeb(nodeStream);

    return new NextResponse(webStream as any, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Google Drive proxy error:", error);
    // Clean up temp file on error
    try {
      const tempPath = join(CACHE_DIR, `${id}.tmp`);
      if (existsSync(tempPath)) {
        await fs.unlink(tempPath);
      }
    } catch (_) {}
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
