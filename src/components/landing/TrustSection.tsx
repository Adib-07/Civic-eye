import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiCheck, FiDatabase, FiFileText, FiShield } from "react-icons/fi";
import { type IconType } from "react-icons";

const TRUST_GROUPS: { title: string; icon: IconType; items: string[] }[] = [
  {
    title: "Data isolation",
    icon: FiDatabase,
    items: [
      "Every organization's data is isolated at the database level",
      "Issues, files, and images are scoped to your organization only",
      "Access is further limited to each user's role",
    ],
  },
  {
    title: "Access control",
    icon: FiShield,
    items: [
      "Role-based permissions enforced at the database level",
      "Staff sign in through secure authentication flows",
      "Every assignment is recorded explicitly, not inferred",
    ],
  },
  {
    title: "Evidence & audit",
    icon: FiFileText,
    items: [
      "Photo proof and work notes are required before an issue is resolved",
      "A full audit trail records every status change and assignment",
      "Reporters or supervisors confirm the fix was real",
    ],
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-background py-16 lg:py-24">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Trust &amp; Security</p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Security and accountability are built into the platform
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Your data is isolated, scoped, and auditable by design — not added as an afterthought.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {TRUST_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                </div>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/security"
            className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
          >
            Security Details <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
