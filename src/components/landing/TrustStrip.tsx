import { TRUST_ITEMS } from "@/components/landing/landing-data";
import { FiCheck } from "react-icons/fi";

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background py-4">
      <div className="page-container flex flex-col items-center justify-between gap-3 md:flex-row">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-center md:text-left">
          Built for teams responsible for real-world spaces
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
            >
              <FiCheck className="h-3 w-3 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
