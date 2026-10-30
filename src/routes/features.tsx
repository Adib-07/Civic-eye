import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiCheckCircle,
  FiMap,
  FiMessageSquare,
  FiShield,
  FiUpload,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — CivicEye" },
      {
        name: "description",
        content:
          "Reporting, assignment, SLA tracking, evidence-backed resolution, verification, mapping, analytics, an AI assistant, and multi-tenant organization management.",
      },
    ],
  }),
  component: FeaturesPage,
});

const FEATURES = [
  {
    icon: FiUpload,
    title: "Evidence-first reporting",
    text: "Submit a photo, a description and a dropped pin. CivicEye suggests the category automatically so triage starts with a clean record instead of a guess.",
  },
  {
    icon: FiZap,
    title: "Assignment and ownership",
    text: "Move an issue from Pending to In Progress with a named owner. Everyone can see who has it, and nobody can quietly drop it.",
  },
  {
    icon: FiCheckCircle,
    title: "Verified resolution",
    text: "Resolutions require evidence and are approved by a reporter or an admin. Approved work becomes Verified; unfixed work goes back to Reopened instead of disappearing.",
  },
  {
    icon: FiBarChart2,
    title: "SLA visibility",
    text: "Per-category service levels, deadline tracking, breach flags and a compliance rate on the dashboard, so nothing slips silently.",
  },
  {
    icon: FiMap,
    title: "Live issue map",
    text: "Every issue plotted geographically with status and category, so clusters by ward or street are obvious at a glance.",
  },
  {
    icon: FiMessageSquare,
    title: "CivicEye AI assistant",
    text: "An in-product assistant grounded in your own workspace data that answers questions about reporting, triage, SLA and verification.",
  },
  {
    icon: FiBell,
    title: "Notifications",
    text: "Assignment, status-change and SLA alerts land in an in-app notification centre, so nothing depends on someone reading an inbox.",
  },
  {
    icon: FiUsers,
    title: "Organization & team management",
    text: "Organization admins invite teammates with a role, and the invitee joins the right workspace automatically. Plans carry real staff and volume limits.",
  },
  {
    icon: FiShield,
    title: "Tenant isolation",
    text: "Row level security in the database keeps one organization's issues, team and billing invisible to every other organization.",
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main-content">
        <section className="container py-16 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Product</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Everything between a complaint and a confirmed fix.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            CivicEye is a multi-page operations platform, not a contact form. Here is what ships in
            the product today.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/start" className="btn-primary inline-flex items-center gap-2">
              Start a free pilot <FiArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              See the workflow
            </Link>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="surface-panel p-6">
                <span className="icon-wrapper-lg icon-wrapper-primary">
                  <feature.icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-base font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container py-20">
          <div className="surface-panel p-8 text-center">
            <h2 className="font-display text-2xl font-bold">Ready to see it on your own data?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Start a 30-day pilot with up to 5 staff, or talk to us about a tailored deployment.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/start" className="btn-primary inline-flex items-center gap-2">
                Start a free pilot <FiArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link to="/book-demo" className="btn-secondary">
                Book a demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
