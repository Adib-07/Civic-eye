import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FiCamera,
  FiCpu,
  FiMapPin,
  FiActivity,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiLock,
  FiUsers,
  FiGrid,
} from "react-icons/fi";
import citizenImg from "@/assets/citizen.jpg.asset.json";
import heroImg from "@/assets/hero.jpg.asset.json";
import streetlightImg from "@/assets/streetlight.jpg.asset.json";
import workerImg from "@/assets/worker.jpg.asset.json";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "CivicEye — Civic Issue Reporting for Organizations",
      },
      {
        name: "description",
        content:
          "CivicEye helps municipalities, campuses, and housing societies collect geo-tagged issue reports, assign staff, track SLAs, and verify resolutions — with organization-level data isolation.",
      },
      {
        property: "og:title",
        content: "CivicEye — Civic Issue Reporting for Organizations",
      },
      {
        property: "og:description",
        content:
          "Photo-first citizen reporting plus a staff operations dashboard: assign, resolve, and verify civic issues in one workflow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const audiences = [
  {
    icon: FiUsers,
    title: "Municipal wards & city teams",
    text: "Centralise potholes, waste, lighting, and water complaints with assignment, SLA tracking, and verification.",
  },
  {
    icon: FiGrid,
    title: "Campuses & institutions",
    text: "Give facilities teams one queue for maintenance requests with photo evidence and status history.",
  },
  {
    icon: FiMapPin,
    title: "Housing societies & estates",
    text: "Let residents report issues in seconds while your management committee triages and closes them transparently.",
  },
];

const features = [
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
    text: "Resolved work can be confirmed or sent back to In Progress — a clear audit trail for accountability.",
  },
  {
    icon: FiMapPin,
    title: "Map-ready records",
    text: "Geo-tagged issues feed your live map view so crews know exactly where to go.",
  },
];

const steps = [
  {
    n: "01",
    title: "Resident reports",
    text: "A citizen photographs the issue, confirms the category, and submits in under a minute.",
    image: citizenImg.url,
    alt: "Resident photographing a civic issue with a smartphone",
  },
  {
    n: "02",
    title: "Organization receives",
    text: "The issue appears in your dashboard with location, SLA deadline, and status history.",
    image: streetlightImg.url,
    alt: "Street infrastructure issue in a residential area",
  },
  {
    n: "03",
    title: "Staff resolves & verifies",
    text: "Assign a team member, update status, mark resolved, and let the citizen verify the fix.",
    image: workerImg.url,
    alt: "Maintenance crew working on a civic repair",
  },
];

const trustPoints = [
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
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative mt-3 overflow-hidden">
          <div className="mx-auto w-[min(1200px,94vw)]">
            <div className="relative overflow-hidden rounded-2xl border border-border sm:rounded-3xl">
              <img
                src={heroImg.url}
                alt=""
                width={1920}
                height={900}
                className="h-[440px] w-full object-cover sm:h-[520px] lg:h-[560px]"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.21_0.05_262_/_82%)] via-[oklch(0.21_0.05_262_/_74%)] to-[oklch(0.21_0.05_262_/_55%)] sm:bg-gradient-to-r sm:from-[oklch(0.21_0.05_262_/_90%)] sm:via-[oklch(0.21_0.05_262_/_70%)] sm:to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="w-full px-5 py-8 sm:px-10 lg:px-12">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-semibold uppercase tracking-wider text-white/80 sm:text-sm"
                  >
                    B2B civic operations platform
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mt-3 max-w-2xl font-display text-[1.75rem] font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-[3.25rem]"
                  >
                    Report, assign, and resolve civic issues — one organization, one workflow.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:text-lg"
                  >
                    CivicEye connects residents who spot problems with the teams responsible for
                    fixing them. Collect geo-tagged reports, manage assignments, track SLAs, and
                    verify resolutions — without spreadsheets or lost WhatsApp messages.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
                  >
                    <Link
                      to="/report"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                    >
                      Report an issue <FiArrowRight aria-hidden />
                    </Link>
                    <Link
                      to="/start"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      Start pilot
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      Organization sign in
                    </Link>
                  </motion.div>

                  <p className="mt-5 max-w-lg text-[11px] font-medium leading-relaxed text-white/70 sm:mt-6 sm:text-xs">
                    Residents report without an account · Staff access requires organization
                    credentials · Each organization's data stays isolated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="mx-auto w-[min(1200px,94vw)] py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Who it is for
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Built for teams that maintain shared spaces
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Whether you run a ward office, campus facilities desk, or estate management committee,
              CivicEye gives you a professional intake and resolution workflow.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {audiences.map((a, i) => (
              <GlassCard key={a.title} delay={i * 0.05}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                  <a.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-bold sm:text-lg">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-secondary/60 py-14 sm:py-20">
          <div className="mx-auto w-[min(1200px,94vw)]">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                How it works
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                From photo to verified fix
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                A simple lifecycle your residents and staff can follow without training manuals.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-3">
              {steps.map((s, i) => (
                <motion.article
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="card-hover overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                >
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-40 w-full object-cover sm:h-44"
                  />
                  <div className="p-5 sm:p-6">
                    <span className="inline-flex h-8 items-center rounded-lg bg-accent px-2.5 font-display text-sm font-bold text-accent-foreground">
                      {s.n}
                    </span>
                    <h3 className="mt-3 text-base font-bold sm:text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Platform */}
        <section className="mx-auto w-[min(1200px,94vw)] py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Platform
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Everything your operations team needs
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              CivicEye is not just a complaint form — it is an issue-management workflow your
              organization can run every day.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.05}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-bold sm:text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="border-y border-border bg-secondary/60 py-14 sm:py-20">
          <div className="mx-auto w-[min(1200px,94vw)]">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Trust & security
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Ready for organization adoption
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                We do not show fabricated customer counts or ratings. CivicEye earns trust through a
                clear workflow and database-enforced isolation between organizations.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
              {trustPoints.map((t, i) => (
                <GlassCard key={t.title} delay={i * 0.05}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <t.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-[min(1200px,94vw)] py-14 sm:py-20">
          <div className="overflow-hidden rounded-2xl border border-border bg-primary sm:rounded-3xl">
            <div className="grid items-center gap-8 p-7 sm:p-10 md:grid-cols-[1.2fr_1fr] md:p-14">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-primary-foreground sm:text-3xl">
                  Ready to streamline civic issue management?
                </h2>
                <p className="mt-3 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
                  Start with a citizen report to see the flow, or sign in to your organization
                  dashboard to triage and assign real issues.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                  <Link
                    to="/report"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-background/90"
                  >
                    Submit a report <FiArrowRight aria-hidden />
                  </Link>
                  <Link
                    to="/start"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    Start pilot
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    View pricing
                  </Link>
                </div>
              </div>
              <img
                src={workerImg.url}
                alt=""
                loading="lazy"
                width={1200}
                height={800}
                className="hidden h-56 w-full rounded-2xl object-cover md:block"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
