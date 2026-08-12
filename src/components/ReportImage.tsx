import { useEffect, useState } from "react";
import { FiImage, FiRefreshCw } from "react-icons/fi";
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
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setLoading(Boolean(src));
    setFailed(false);
    setRetryCount(0);
  }, [src]);

  const displaySrc =
    src && retryCount > 0 ? `${src}${src.includes("?") ? "&" : "?"}retry=${retryCount}` : src;

  const retry = () => {
    setFailed(false);
    setLoading(true);
    setRetryCount((n) => n + 1);
  };

  if (!src || failed) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-secondary text-muted-foreground",
          placeholderClassName ?? className,
        )}
        role="img"
        aria-label={failed ? "Evidence unavailable" : "No evidence attached"}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center text-xs font-semibold">
          <FiImage className="h-6 w-6 opacity-60" aria-hidden />
          <span>{failed ? "Evidence unavailable" : "No evidence attached"}</span>
          {failed && src && (
            <button
              type="button"
              onClick={retry}
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-bold text-foreground hover:bg-secondary"
            >
              <FiRefreshCw className="h-3 w-3" aria-hidden />
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  const img = (
    <img
      key={retryCount}
      src={displaySrc ?? undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
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
        aria-label={`View evidence: ${alt}`}
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
