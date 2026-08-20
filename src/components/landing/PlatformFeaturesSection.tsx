import {
  FiCamera,
  FiCheckCircle,
  FiCpu,
  FiLock,
  FiMapPin,
  FiShield,
  FiActivity,
} from "react-icons/fi";

import { PLATFORM_FEATURES } from "@/components/landing/landing-data";
import { FeatureSection } from "@/components/landing/FeatureSection";

const ICONS = [FiCamera, FiCpu, FiActivity, FiShield, FiCheckCircle, FiMapPin] as const;

const TRUST_POINTS = [
  {
    icon: FiLock,
    title: "Secure by design",
    text: "Row Level Security isolates each organization's data. Staff credentials never expose privileged keys in the browser.",
  },
  {
    icon: FiShield,
    title: "Clear roles",
    text: "Officers, admins, and reporters have distinct capabilities enforced at the database — not just the UI.",
  },
  {
    icon: FiCheckCircle,
    title: "Transparent workflow",
    text: "Statuses move from Pending through assignment, resolution, and verification — visible to staff and reporters.",
  },
] as const;

export function PlatformFeaturesSection() {
  return (
    <FeatureSection
      className="border-y border-border bg-secondary/25"
      label="Platform"
      title="Built for organizational adoption"
      description="CivicEye earns trust through a clear workflow and database-enforced isolation between organizations."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_FEATURES.map((f, i) => {
          const Icon = ICONS[i] ?? FiCheckCircle;
          return (
            <article key={f.title} className="landing-feature-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {TRUST_POINTS.map((t) => (
          <article key={t.title} className="landing-feature-card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary">
              <t.icon className="h-4 w-4" aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-semibold">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
          </article>
        ))}
      </div>
    </FeatureSection>
  );
}
