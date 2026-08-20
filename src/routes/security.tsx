import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiCheckCircle,
  FiLock,
  FiShield,
  FiDatabase,
  FiEye,
  FiFileText,
  FiKey,
  FiUsers,
} from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

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

const SECURITY_SECTIONS = [
  {
    icon: FiKey,
    title: "Authentication",
    description:
      "Staff access is managed through Supabase Auth with email and password credentials. Authentication tokens are handled server-side and never exposed in the browser.",
  },
  {
    icon: FiUsers,
    title: "Role-Based Access Control",
    description:
      "Each staff member is assigned a role (administrator, ward officer, or reporter) that determines what they can view, edit, and resolve. Roles are enforced at the database level — not just the user interface.",
  },
  {
    icon: FiDatabase,
    title: "Organization Data Isolation",
    description:
      "Every organization's issues, staff profiles, and files are strictly isolated using database-level Row Level Security (RLS) policies. One organization's data is never accessible to another.",
  },
  {
    icon: FiLock,
    title: "Database Security",
    description:
      "CivicEye uses Supabase (hosted PostgreSQL) with Row Level Security enforced at the database engine level. Queries that attempt to cross organization boundaries are rejected before data leaves the database.",
  },
  {
    icon: FiEye,
    title: "File & Image Security",
    description:
      "Uploaded issue images and evidence files are stored in organization-scoped storage buckets with private signed URLs. Files are not publicly accessible without valid, time-limited credentials.",
  },
  {
    icon: FiFileText,
    title: "Auditability",
    description:
      "Every status change, assignment, resolution, and verification is recorded with timestamps and actor information. This creates a complete audit trail for every issue from report to verified resolution.",
  },
  {
    icon: FiShield,
    title: "Data Handling",
    description:
      "Issue reports, photo evidence, and location data are used exclusively for operational maintenance workflows. CivicEye does not sell, share, or provide organization data to third parties.",
  },
];

function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <p className="section-label">Security & Trust</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
            Security built into the architecture
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-2xl">
            CivicEye is designed so that organization data isolation, role enforcement, and audit
            accountability are structural properties — not optional configurations.
          </p>

          <div className="mt-10 space-y-6">
            {SECURITY_SECTIONS.map((section) => (
              <article
                key={section.title}
                className="surface-panel p-5 sm:p-6 flex items-start gap-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-primary">
                  <section.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <h2 className="text-base font-semibold">{section.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-12 surface-panel p-6 sm:p-8">
            <h2 className="section-title text-xl">What we do not claim</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  We do not claim &quot;bank-grade&quot; or &quot;military-grade&quot; security. Our
                  security posture is based on proven Supabase/PostgreSQL infrastructure and
                  standard best practices.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  We do not currently offer automated backups or real-time monitoring dashboards.
                  These are planned as the platform matures.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground/50 mt-0.5 shrink-0">&bull;</span>
                <span>
                  We do not store payment data. Billing is handled through external payment
                  processors.
                </span>
              </li>
            </ul>
          </section>

          <div className="mt-12 text-center space-y-3">
            <h3 className="text-lg font-bold text-foreground">Questions about security?</h3>
            <p className="text-sm text-muted-foreground">
              Contact us to discuss how CivicEye fits your organization&apos;s security
              requirements.
            </p>
            <div className="pt-2">
              <Link to="/book-demo" className="btn-primary inline-flex px-5 py-2.5 text-sm">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
