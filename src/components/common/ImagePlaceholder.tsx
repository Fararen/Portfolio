import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  filePath?: string;
  aspectRatio?: string; // e.g. "aspect-video"
  className?: string;
}

export default function ImagePlaceholder({
  filePath,
  aspectRatio = "aspect-video",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6 text-center text-xs text-[var(--color-fg-muted)] ${aspectRatio} ${className}`}
      role="img"
      aria-label={filePath ? `Image placeholder for ${filePath}` : "Image placeholder"}
    >
      <ImageIcon className="mb-2 h-6 w-6 opacity-40" aria-hidden="true" />
      <span className="font-medium opacity-70">Asset needed</span>
      {filePath && (
        <code className="mt-1 max-w-[90%] truncate rounded bg-[var(--color-bg)] px-1.5 py-0.5 text-[10px] text-[var(--color-fg-muted)]">
          {filePath}
        </code>
      )}
    </div>
  );
}

