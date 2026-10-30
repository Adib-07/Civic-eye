import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FiArrowRight,
  FiCompass,
  FiEye,
  FiGlobe,
  FiLayers,
  FiLock,
  FiMapPin,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CivicEye — Civic Issue Operations" },
      {
        name: "description",
        content:
          "CivicEye is a civic-tech SaaS platform that takes operational issues from first report to independently verified resolution.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    icon: FiEye,
    title: "Evidence over assertion",
    text: "A resolution is a claim until it is evidenced. Every fix carries before and after proof, and nothing is closed on a promise alone.",
  },
  {
    icon: FiMapPin,
    title: "Location is part of the record",
    text: "An issue without a pin is a rumour. Reports are geo-tagged at capture so clusters, wards and repeat offenders are visible on a map.",
  },
  {
    icon: FiLock,
    title: "Tenant isolation by default",
    text: "Organization data is separated at the database layer with row level security, not in application code that can be forgotten.",
  },
  {
    icon: FiGlobe,
    title: "Accessible to everyone",
    text: "Civic issues are a public concern. Anyone can report one; the workflow exists so the people who live with the problem can also confirm the fix.",
  },
];

const AUDIENCES = [
  {
    icon: FiUsers,
    title: "Housing societies & townships",
    text: "Give residents a real channel for potholes, water leaks, garbage and street lighting — and show the committee exactly what is open, owned and overdue.",
  },
  {
    icon: FiCompass,
    title: "Campuses & institutions",
    text: "Route hostel, lab and campus issues to the right department with SLA clocks, so a request does not die in an inbox.",
  },
  {
    icon: FiLayers,
    title: "Corporate facilities",
    text: "Unify contractor and employee requests across a portfolio of sites with evidence-backed sign-off before a ticket is closed.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main-content">
        <section className="container py-16 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About us</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Most civic issue software stops at <span className="text-primary">"ticket closed"</span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            CivicEye was built around a simple observation: the hard part of fixing a city is not
            logging the complaint, it is proving it was actually fixed. So we built the whole
            product around a single auditable chain — report, assign, resolve with evidence, verify.
          </p>
        </section>

        <section className="border-y border-border bg-secondary/30 py-16">
          <div className="container grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="surface-panel p-6">
                <span className="icon-wrapper-lg icon-wrapper-primary">
                  <principle.icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-base font-semibold">{principle.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container py-16 sm:py-20">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Who it is for</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            CivicEye is a multi-tenant SaaS. Each organization gets an isolated workspace, its own
            team, its own SLA policies and its own subscription.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {AUDIENCES.map((audience) => (
              <div key={audience.title} className="surface-panel p-6">
                <span className="icon-wrapper-lg icon-wrapper-primary">
                  <audience.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold">{audience.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {audience.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container pb-20">
          <div className="surface-panel flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">See it on your own issues</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Start with a free pilot, or book a walkthrough with the team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/start" className="btn-primary inline-flex items-center gap-2">
                Start a free pilot <FiArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link to="/book-demo" className="btn-secondary inline-flex items-center gap-2">
                <FiShield className="h-4 w-4" aria-hidden /> Book a demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
