import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiArrowRight,
  FiCheck,
  FiLock,
  FiShield,
  FiDatabase,
  FiEye,
  FiFileText,
  FiKey,
  FiUsers,
  FiServer,
  FiCheckCircle,
  FiLayers,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const SECURITY_LAYERS = [
  {
    icon: FiKey,
    title: "Authentication",
    description:
      "Staff access is protected with encrypted authentication and secure credential storage. Authentication tokens are handled server-side and never exposed in the browser.",
    details: [
      "Server-side token management",
      "Encrypted credential storage",
      "Secure session handling",
      "No browser-side credential exposure",
    ],
  },
  {
    icon: FiUsers,
    title: "Role-Based Access Control",
    description:
      "Each staff member is assigned a role that determines what they can view, edit, and resolve. Roles are enforced at the database level — not just the UI.",
    details: [
      "Administrator, Staff, Reporter roles",
      "Database-level enforcement",
      "Department-scoped permissions",
      "Least-privilege access model",
    ],
  },
  {
    icon: FiDatabase,
    title: "Organization Data Isolation",
    description:
      "Every organization's issues, staff profiles, and files are strictly isolated using database-level Row Level Security policies.",
    details: [
      "Database-level Row Level Security",
      "Cross-organization queries rejected",
      "Tenant isolation at engine level",
      "No shared data between organizations",
    ],
  },
  {
    icon: FiLock,
    title: "Database Security",
    description:
      "CivicEye uses a hardened relational database with RLS enforced at the database engine level. Queries that attempt to cross organization boundaries are rejected before data leaves the database.",
    details: [
      "Hardened relational database",
      "RLS enforced at engine level",
      "Query-level boundary enforcement",
      "Managed infrastructure security",
    ],
  },
  {
    icon: FiEye,
    title: "File & Image Security",
    description:
      "Uploaded issue images and evidence files are stored in organization-scoped storage buckets with private signed URLs.",
    details: [
      "Organization-scoped storage buckets",
      "Private signed URLs for access",
      "Time-limited credential expiry",
      "No public file access",
    ],
  },
  {
    icon: FiFileText,
    title: "Auditability",
    description:
      "Every status change, assignment, resolution, and verification is recorded with timestamps and actor information.",
    details: [
      "Complete status change history",
      "Actor identification on every action",
      "Timestamped audit trail",
      "Issue-to-resolution traceability",
    ],
  },
  {
    icon: FiShield,
    title: "Data Handling",
    description:
      "Issue reports, photo evidence, and location data are used exclusively for operational maintenance workflows. We do not sell, share, or provide organization data to third parties.",
    details: [
      "Operational use only",
      "No third-party data sharing",
      "No data selling",
      "Privacy-first data policy",
    ],
  },
];

const ARCHITECTURE_LAYERS = [
  {
    layer: "Application Layer",
    icon: FiArrowUpRight,
    description: "Secure web application with role-based UI",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    layer: "Authentication Layer",
    icon: FiKey,
    description: "Server-side token management and session control",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
  {
    layer: "Authorization Layer",
    icon: FiUsers,
    description: "Role-based access enforced at database level",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
  {
    layer: "Data Isolation Layer",
    icon: FiDatabase,
    description: "Row Level Security — organization boundaries enforced",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    layer: "Storage Layer",
    icon: FiServer,
    description: "Organization-scoped file storage with signed URLs",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
];

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Trust — CivicEye" },
      {
        name: "description",
        content:
          "How CivicEye protects organization data with database-level isolation, role-based access, and evidence-backed workflows.",
      },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="page-hero">
        <div className="page-hero-grid" aria-hidden />
        <div className="relative z-10 container pt-24 pb-20 lg:pt-32 lg:pb-28 text-center">
          <RevealBlock>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-hero-accent">
              <FiShield className="h-3 w-3" />
              Security & Trust
            </span>
          </RevealBlock>

          <RevealBlock delay={100}>
            <h1 className="mt-7 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl mx-auto">
              Security built into the <span className="text-hero-accent">architecture</span>
            </h1>
          </RevealBlock>

          <RevealBlock delay={200}>
            <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
              CivicEye is designed so that organization data isolation, role enforcement, and audit
              accountability are structural properties — not optional configurations.
            </p>
          </RevealBlock>

          <RevealBlock delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400/70">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-emerald-400" />
                Database-level isolation
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-emerald-400" />
                Role-based access control
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-emerald-400" />
                Full audit trail
              </span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Architecture Visual ─── */}
      <section className="inner-section bg-background">
        <div className="container">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="caption">Security Architecture</p>
              <h2 className="mt-4 headline-2">Five layers of protection</h2>
              <p className="mt-5 body-lg text-muted-foreground max-w-xl mx-auto">
                Every layer is designed to enforce boundaries and protect organization data — from
                the user interface down to the database engine.
              </p>
            </div>
          </RevealBlock>

          <div className="max-w-3xl mx-auto">
            {ARCHITECTURE_LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <RevealBlock key={layer.layer} delay={i * 100}>
                  <div className="relative flex items-center gap-5 py-5">
                    {/* Connector line */}
                    {i < ARCHITECTURE_LAYERS.length - 1 && (
                      <div className="absolute left-6 top-[3.5rem] w-px h-[calc(100%-2rem)] bg-gradient-to-b from-border to-border/30" />
                    )}

                    <span
                      className={cn(
                        "relative z-10 inline-grid place-items-center w-12 h-12 rounded-xl border shrink-0",
                        layer.color,
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>

                    <div className="flex-1 surface-panel p-5">
                      <h3 className="text-sm font-bold text-foreground">{layer.layer}</h3>
                      <p className="mt-1 body-xs text-muted-foreground">{layer.description}</p>
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Security Details ─── */}
      <section className="inner-section bg-secondary/30 border-y border-border">
        <div className="container">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="caption">Security Practices</p>
              <h2 className="mt-4 headline-2">How we protect your data</h2>
            </div>
          </RevealBlock>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECURITY_LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <RevealBlock key={layer.title} delay={i * 80}>
                  <div className="security-layer p-7 h-full">
                    <div className="security-layer-icon">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-5 headline-4">{layer.title}</h3>
                    <p className="mt-3 body-sm text-muted-foreground leading-relaxed">
                      {layer.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {layer.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 body-xs text-muted-foreground"
                        >
                          <FiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── What We Do Not Claim ─── */}
      <section className="inner-section bg-background">
        <div className="container max-w-3xl">
          <RevealBlock>
            <div className="surface-panel p-8 sm:p-10">
              <h2 className="headline-3">What we do not claim</h2>
              <p className="mt-3 body-sm text-muted-foreground">
                Transparency is part of our security posture. Here is what we do not claim.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  'We do not claim "bank-grade" or "military-grade" security. Our security posture is based on proven managed database and authentication infrastructure and standard best practices.',
                  "We do not currently offer automated backups or real-time monitoring dashboards. These are planned as the platform matures.",
                  "We do not store payment data. Billing is handled through external payment processors.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                    <span className="body-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-banner py-20 lg:py-24 text-center">
        <div className="container relative z-10 max-w-3xl mx-auto">
          <RevealBlock>
            <h2 className="headline-2 text-white">Questions about security?</h2>
          </RevealBlock>
          <RevealBlock delay={100}>
            <p className="mt-5 body-lg text-slate-300/80 max-w-xl mx-auto">
              Contact us to discuss how CivicEye fits your organization's security requirements. We
              are happy to walk through our architecture in detail.
            </p>
          </RevealBlock>
          <RevealBlock delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/book-demo" className="btn-cinematic-primary">
                Book a Demo
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn-cinematic-secondary">
                View Pricing
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
}
