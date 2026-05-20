/**
 * Automatically converts human-viewable cloud links (Google Drive, Dropbox)
 * into direct raw file streaming URLs for HTML5 <video> elements.
 */
export function getDirectVideoUrl(url?: string): string {
  if (!url) return "";

  const trimmed = url.trim();

  // 1. Handle Google Drive Links
  if (trimmed.includes("drive.google.com")) {
    // Extract file ID from /file/d/FILE_ID/view or /preview
    const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch && fileMatch[1]) {
      return `/api/video/stream?id=${fileMatch[1]}`;
    }
    
    // Extract file ID from open?id=FILE_ID
    const openMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch && openMatch[1]) {
      return `/api/video/stream?id=${openMatch[1]}`;
    }
  }

  // 2. Handle Dropbox Links
  if (trimmed.includes("dropbox.com")) {
    // Replace dl=0 with raw=1 to force direct streaming
    return trimmed.replace(/[?&]dl=0/, "?raw=1").replace(/[?&]dl=1/, "?raw=1");
  }

  return trimmed;
}

