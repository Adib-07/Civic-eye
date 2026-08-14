import type { ReactNode } from "react";

export function FeatureSection({
  label,
  title,
  description,
  children,
  className = "",
}: {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="page-container">
        <div className="max-w-2xl">
          <p className="section-label">{label}</p>
          <h2 className="mt-2 section-title text-2xl sm:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
