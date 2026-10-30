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
    <section className="page-section border-y border-border bg-background">
      <div className="container">
        <div className="section-header-center animate-slide-up">
          <p className="caption">Trust & Security</p>
          <h2 className="mt-4 headline-2">
            Security and accountability are built into the platform
          </h2>
          <p className="mt-5 body-lg text-muted-foreground max-w-2xl mx-auto">
            Your data is isolated, scoped, and auditable by design — not added as an afterthought.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {TRUST_GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="card p-7 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="icon-wrapper-lg icon-wrapper-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="headline-4">{group.title}</h3>
                </div>
                <ul className="space-y-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FiCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                      <span className="body-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center animate-slide-up stagger-3">
          <Link
            to="/security"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            Security Details
            <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
