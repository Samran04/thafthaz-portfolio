/**
 * Utility to convert Google Drive shareable file/folder links into direct embeddable Image/Video URLs
 */

export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;

  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view...
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) return fileIdMatch[1];

  // Pattern 2: https://drive.google.com/drive/folders/FOLDER_ID
  const folderIdMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderIdMatch && folderIdMatch[1]) return folderIdMatch[1];

  // Pattern 3: https://drive.google.com/open?id=FILE_ID or uc?id=FILE_ID
  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  return null;
}

export function getGoogleDriveDirectStreamUrl(url: string): string {
  const driveId = extractGoogleDriveId(url);
  if (driveId) {
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }
  return url;
}

export function formatMediaUrl(url: string, isVideo = false): string {
  if (!url) return '';

  const driveId = extractGoogleDriveId(url);
  if (driveId) {
    if (isVideo) {
      // Return preview embed URL for Google Drive Video with autoplay & muted enabled
      return `https://drive.google.com/file/d/${driveId}/preview`;
    }
    // Return direct high-res image URL for Google Drive Image
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  // Handle YouTube links
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1`;
    }
  }

  return url;
}
