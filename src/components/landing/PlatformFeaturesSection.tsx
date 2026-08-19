import {
  FiActivity,
  FiCamera,
  FiCheckCircle,
  FiCpu,
  FiLock,
  FiMapPin,
  FiShield,
} from "react-icons/fi";

import { FeatureSection } from "@/components/landing/FeatureSection";

const PLATFORM_FEATURES = [
  {
    icon: FiCamera,
    title: "Fast citizen reporting",
    text: "Photo-first submission with auto location and category suggestions — no login required for residents.",
  },
  {
    icon: FiCpu,
    title: "Structured intake",
    text: "Every report includes category, description, coordinates, and optional evidence for field teams.",
  },
  {
    icon: FiActivity,
    title: "Operations dashboard",
    text: "Staff see open issues, SLA status, assignments, and resolution queues for their organization only.",
  },
  {
    icon: FiShield,
    title: "Organization isolation",
    text: "Database-level row security keeps each organization's issues, staff, and files separate.",
  },
  {
    icon: FiCheckCircle,
    title: "Verify before close",
    text: "Resolved work can be confirmed or sent back — a clear audit trail for accountability.",
  },
  {
    icon: FiMapPin,
    title: "Map-ready records",
    text: "Geo-tagged issues feed your live map view so crews know exactly where to go.",
  },
] as const;

const TRUST_POINTS = [
  {
    icon: FiLock,
    title: "Secure by design",
    text: "Row Level Security isolates each organization's data. Staff credentials never expose privileged keys in the browser.",
  },
  {
    icon: FiShield,
    title: "Clear roles",
    text: "Ward officers, admins, and citizens have distinct capabilities enforced at the database — not just the UI.",
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
      title="Everything your operations team needs"
      description="CivicEye is not just a complaint form — it is issue-management software your organization runs every day."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_FEATURES.map((f) => (
          <article key={f.title} className="landing-feature-card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary">
              <f.icon className="h-4 w-4" aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </article>
        ))}
      </div>
    </FeatureSection>
  );
}

export function TrustSecuritySection() {
  return (
    <FeatureSection
      label="Trust &amp; security"
      title="Built for organizational adoption"
      description="CivicEye earns trust through a clear workflow and database-enforced isolation between organizations."
    >
      <div className="grid gap-4 sm:grid-cols-3">
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
