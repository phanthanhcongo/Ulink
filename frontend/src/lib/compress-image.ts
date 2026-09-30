/**
 * Client-side image compression using Canvas API.
 * Resizes large images and re-encodes as WebP/JPEG to drastically reduce
 * file size before uploading (e.g. 5 MB → ~200-400 KB).
 *
 * Videos and non-image files are returned as-is.
 */

const MAX_DIMENSION = 1600; // px – longest side
const QUALITY = 0.82; // WebP/JPEG quality (0–1)
const MAX_FILE_SIZE = 500 * 1024; // 500 KB target

/**
 * Returns true if the browser supports WebP encoding via canvas.
 */
function supportsWebP(): boolean {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    return false;
  }
}

/**
 * Compress an image File, returning a new (smaller) File.
 * - Resizes to fit within MAX_DIMENSION × MAX_DIMENSION (preserving aspect ratio)
 * - Re-encodes as WebP (preferred) or JPEG
 * - If the original is already small enough (< MAX_FILE_SIZE) and within
 *   dimension limits, returns it unchanged.
 * - Non-image files (video, PDF, etc.) are returned as-is.
 */
export async function compressImage(file: File): Promise<File> {
  // Skip non-image files
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // Skip SVGs — they're already tiny and can't be rasterized well
  if (file.type === 'image/svg+xml') {
    return file;
  }

  return new Promise<File>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const { width, height } = img;

      // If already small enough, skip compression
      if (
        file.size <= MAX_FILE_SIZE &&
        width <= MAX_DIMENSION &&
        height <= MAX_DIMENSION
      ) {
        resolve(file);
        return;
      }

      // Calculate new dimensions (fit within MAX_DIMENSION box)
      let newWidth = width;
      let newHeight = height;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        newWidth = Math.round(width * ratio);
        newHeight = Math.round(height * ratio);
      }

      // Draw onto canvas
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file); // Fallback — no canvas support
        return;
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Encode — prefer WebP, fallback to JPEG
      const useWebP = supportsWebP();
      const mimeType = useWebP ? 'image/webp' : 'image/jpeg';
      const extension = useWebP ? '.webp' : '.jpg';

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // Build a new filename: strip old extension, add new one
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const compressedFile = new File(
            [blob],
            `${baseName}${extension}`,
            { type: mimeType, lastModified: Date.now() }
          );

          resolve(compressedFile);
        },
        mimeType,
        QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // If we can't load the image, return the original
      resolve(file);
    };

    img.src = objectUrl;
  });
}
