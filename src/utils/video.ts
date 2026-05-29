/**
 * Automatically converts human-viewable cloud links (Google Drive, Dropbox)
 * into direct raw file streaming URLs for HTML5 <video> elements.
 *
 * Supported Google Drive formats:
 *   https://drive.google.com/file/d/FILE_ID/view
 *   https://drive.google.com/file/d/FILE_ID/preview
 *   https://drive.google.com/open?id=FILE_ID&usp=drive_copy   ← paste format
 *   https://drive.google.com/uc?id=FILE_ID
 */

/** Extract the raw Drive file ID from any Google Drive URL */
export function extractDriveId(url?: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed.includes("drive.google.com") && !trimmed.includes("/api/video/stream")) return undefined;

  // Already a stream proxy URL: /api/video/stream?id=FILE_ID
  const proxyMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (proxyMatch?.[1]) return proxyMatch[1];

  // /file/d/FILE_ID/...
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  return undefined;
}

/** Returns a server-proxy streaming URL for use in HTML5 <video> */
export function getDirectVideoUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // 1. Google Drive
  if (trimmed.includes("drive.google.com")) {
    // /file/d/FILE_ID/...
    const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch?.[1]) return `/api/video/stream?id=${fileMatch[1]}`;

    // open?id=FILE_ID or uc?id=FILE_ID
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch?.[1]) return `/api/video/stream?id=${idMatch[1]}`;
  }

  // 2. Dropbox
  if (trimmed.includes("dropbox.com")) {
    return trimmed.replace(/[?&]dl=0/, "?raw=1").replace(/[?&]dl=1/, "?raw=1");
  }

  return trimmed;
}

/**
 * Returns the Google Drive iframe embed URL (loads instantly in browser,
 * no server proxy needed — best for lightbox playback).
 */
export function getDriveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/** Returns a direct image URL for use in HTML5 <img>, supporting Google Drive */
export function getDirectImageUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  if (trimmed.includes("drive.google.com")) {
    const fileId = extractDriveId(trimmed);
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  return trimmed;
}
