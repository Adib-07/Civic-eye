import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCheckSquare,
  FiClock,
  FiLayers,
  FiMapPin,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/for-organizations")({
  head: () => ({
    meta: [
      { title: "CivicEye for Organizations — Turn Civic Complaints into Verified Resolutions" },
      {
        name: "description",
        content:
          "CivicEye helps RWAs, universities, townships, campuses, and facility managers report, assign, track, and verify local issues from one platform.",
      },
    ],
  }),
  component: ForOrganizationsPage,
});

const TARGET_ORGS = [
  {
    title: "Residential Communities & RWAs",
    desc: "Empower residents with a 30-second issue reporting link. Track pothole repairs, waste collection, and lighting outages with full accountability.",
    icon: FiUsers,
  },
  {
    title: "Colleges & Universities",
    desc: "Streamline campus maintenance across academic blocks, hostels, and sports facilities with automated staff routing and SLA visibility.",
    icon: FiLayers,
  },
  {
    title: "Corporate & Tech Campuses",
    desc: "Keep multi-building office parks operational. Assign facility tickets instantly and verify completion with mandatory photo evidence.",
    icon: FiShield,
  },
  {
    title: "Integrated Townships & Estates",
    desc: "Centralize infrastructure maintenance across massive residential townships. Monitor problem hotspots on interactive maps.",
    icon: FiMapPin,
  },
  {
    title: "Facility Management Companies",
    desc: "Manage client SLA commitments, track vendor resolution times, and maintain a tamper-proof digital audit history of all repairs.",
    icon: FiCheckSquare,
  },
];

const WORKFLOW_STAGES = [
  { step: "01", title: "Receive Reports", text: "Capture photo-backed issue reports with GPS pins directly from residents, staff, or visitors." },
  { step: "02", title: "Assign Responsibility", text: "Route complaints to designated ward officers, maintenance contractors, or internal staff." },
  { step: "03", title: "Track Progress", text: "Monitor active tickets in real time with automated SLA timers and escalation alerts." },
  { step: "04", title: "Monitor Resolution", text: "Staff upload mandatory 'after-fix' photo evidence and completion notes before resolving." },
  { step: "05", title: "Verify Completed Work", text: "Citizens or supervisors confirm that the problem was genuinely fixed on the ground." },
  { step: "06", title: "Analyze Recurring Issues", text: "Identify recurring defects, bottleneck wards, and vendor response trends on visual charts." },
];

export function ForOrganizationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="cinematic" />

      <main className="relative">
        {/* Hero Section */}
        <section className="cinematic-hero relative overflow-hidden py-16 lg:py-24">
          <div className="cinematic-hero-bg" aria-hidden />
          <div className="page-container relative z-10 text-center">
            <span className="inline-block rounded-full border border-blue-500/20 bg-blue-950/40 px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-300">
              FOR RWAs, CAMPUSES & FACILITY TEAMS
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl max-w-4xl mx-auto">
              Turn civic complaints into{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
                verified resolutions.
              </span>
            </h1>
            <p className="mt-6 text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              CivicEye helps communities and organizations report, assign, track and verify local issues from one platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/book-demo" className="cinematic-btn-primary group shadow-lg shadow-blue-900/30">
                <span>Book an Organization Demo</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="cinematic-btn-secondary">
                View Proposed Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Who CivicEye is For */}
        <section className="py-16 bg-background">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                Target Organizations
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                Built for teams responsible for real-world spaces
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Whether you manage a residential society, a university campus, or a multi-building commercial park, CivicEye turns informal complaints into tracked operational workflows.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TARGET_ORGS.map((org) => (
                <div
                  key={org.title}
                  className="surface-panel p-6 flex flex-col justify-between hover:border-primary/40 transition-colors"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                      <org.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{org.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {org.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6-Stage Organizational Workflow */}
        <section className="py-16 bg-secondary/30 border-y border-border">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                Operational Workflow
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl text-foreground">
                How organizations manage issues on CivicEye
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                End-to-end operational clarity from the second a problem is spotted until citizen verification.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WORKFLOW_STAGES.map((s) => (
                <div key={s.step} className="glass p-6 rounded-2xl border border-border relative">
                  <span className="text-xs font-mono font-bold text-primary">{s.step}</span>
                  <h3 className="mt-2 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Operational Pillars */}
        <section className="py-16 bg-background">
          <div className="page-container space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-500">
                  Centralized Issue Management
                </span>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl text-foreground">
                  Replace fragmented WhatsApp messages and emails
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Consolidate all community issues into a single real-time intake queue. Assign tasks to specific staff members with automatic SLA countdown timers.
                </p>
              </div>
              <div className="surface-panel p-6 space-y-3">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiCheckCircle className="text-emerald-500 h-5 w-5" /> 30-Second Mobile Intake Link
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiCheckCircle className="text-emerald-500 h-5 w-5" /> GPS Location Pinning
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiCheckCircle className="text-emerald-500 h-5 w-5" /> Role-Based Staff Access (RBAC)
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="surface-panel p-6 space-y-3">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiClock className="text-amber-500 h-5 w-5" /> Mandatory After-Fix Photo Upload
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiClock className="text-amber-500 h-5 w-5" /> Citizen "Confirm / Reopen" Flow
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FiClock className="text-amber-500 h-5 w-5" /> Complete Audit Trail History
                </div>
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-500">
                  Accountability & Verification
                </span>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl text-foreground">
                  No ticket is closed without verified evidence
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Field staff cannot mark an issue resolved without attaching photo evidence. Citizens verify the work on-site, ensuring true operational accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-slate-950 text-white border-t border-white/10 text-center">
          <div className="page-container max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to pilot CivicEye in your organization?</h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base">
              Set up your organization workspace in minutes. Start a 30-day pilot or request a live walk-through with our product team.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/book-demo" className="cinematic-btn-primary">
                Book a Demo →
              </Link>
              <Link to="/pricing" className="cinematic-btn-secondary">
                View Pricing Tiers
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
