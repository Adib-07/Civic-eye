import { useState } from "react";
import { FiImage } from "react-icons/fi";
import { cn } from "@/lib/utils";

export function ReportImage({
  src,
  alt,
  className,
  onClick,
  placeholderClassName,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  onClick?: () => void;
  placeholderClassName?: string;
}) {
  const [loading, setLoading] = useState(Boolean(src));
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-secondary text-muted-foreground",
          placeholderClassName ?? className,
        )}
      >
        <div className="flex flex-col items-center gap-2 text-xs font-semibold">
          <FiImage className="h-6 w-6 opacity-60" aria-hidden />
          <span>{failed ? "Photo unavailable" : "No photo attached"}</span>
        </div>
      </div>
    );
  }

  const img = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoading(false)}
      onError={() => {
        setFailed(true);
        setLoading(false);
      }}
      className={cn(className, loading && "opacity-0")}
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn("relative block overflow-hidden", className)}
      >
        {loading && <span className="absolute inset-0 animate-pulse bg-secondary" aria-hidden />}
        {img}
      </button>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {loading && <span className="absolute inset-0 animate-pulse bg-secondary" aria-hidden />}
      {img}
    </div>
  );
}
