import { TRUST_ITEMS } from "@/components/landing/landing-data";
import { FiCheck } from "react-icons/fi";

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background">
      <div className="page-container py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <FiCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
