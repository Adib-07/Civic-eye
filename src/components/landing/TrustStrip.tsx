import { TRUST_ITEMS } from "@/components/landing/landing-data";
import { FiCheck } from "react-icons/fi";

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background/80 py-6">
      <div className="page-container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground text-center md:text-left">
          Built for teams responsible for real-world spaces
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {TRUST_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <FiCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
