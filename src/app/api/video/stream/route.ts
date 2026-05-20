import { NextRequest, NextResponse } from "next/server";

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
    let driveResponse = await fetchDriveFile(id, request.headers.get("user-agent") || "");

    if (!driveResponse.ok) {
      return new NextResponse(`Drive error: ${driveResponse.statusText}`, {
        status: driveResponse.status,
      });
    }

    let contentType = driveResponse.headers.get("content-type") || "video/mp4";
    let contentLength = driveResponse.headers.get("content-length");

    // Check if Google Drive returned a virus scan warning page or error page (HTML)
    if (contentType.includes("text/html")) {
      const html = await driveResponse.text();
      // Try to parse confirmation token from the HTML warning page
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
        contentLength = driveResponse.headers.get("content-length");
      } else {
        console.error(
          `Google Drive proxy error for ID ${id}: Returned HTML page instead of video. This happens if the file is private or rate-limited.`
        );
        return new NextResponse(
          "Google Drive permissions error. Make sure link sharing is set to 'Anyone with the link can view'.",
          { status: 403 }
        );
      }
    }

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=3600");

    const rangeHeader = request.headers.get("range");
    if (rangeHeader && contentLength) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const total = parseInt(contentLength, 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      const chunksize = end - start + 1;

      headers.set("Content-Range", `bytes ${start}-${end}/${total}`);
      headers.set("Content-Length", chunksize.toString());

      // Slicing buffer for partial content response
      const arrayBuffer = await driveResponse.arrayBuffer();
      const slicedBuffer = arrayBuffer.slice(start, end + 1);

      return new NextResponse(slicedBuffer, {
        status: 206,
        headers,
      });
    }

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(driveResponse.body, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Google Drive proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

