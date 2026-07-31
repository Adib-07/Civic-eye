import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FiCamera,
  FiCpu,
  FiMapPin,
  FiActivity,
  FiShield,
  FiTrendingUp,
  FiCheckCircle,
  FiUsers,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import avatar1 from "@/assets/avatar1.jpg.asset.json";
import avatar2 from "@/assets/avatar2.jpg.asset.json";
import avatar3 from "@/assets/avatar3.jpg.asset.json";
import citizenImg from "@/assets/citizen.jpg.asset.json";
import garbageImg from "@/assets/garbage.jpg.asset.json";
import heroImg from "@/assets/hero.jpg.asset.json";
import potholeImg from "@/assets/pothole.jpg.asset.json";
import sidewalkImg from "@/assets/sidewalk.jpg.asset.json";
import streetlightImg from "@/assets/streetlight.jpg.asset.json";
import waterleakImg from "@/assets/waterleak.jpg.asset.json";
import workerImg from "@/assets/worker.jpg.asset.json";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicEye — Report City Problems in Under a Minute" },
      {
        name: "description",
        content:
          "Report potholes, garbage, leaks and broken street lights with a photo. CivicEye classifies each report and routes it to the right municipal team.",
      },
      { property: "og:title", content: "CivicEye — Report City Problems in Under a Minute" },
      {
        property: "og:description",
        content:
          "Photo-first civic reporting: classify the issue, pin it on the map, track the fix.",
      },
      { property: "og:image", content: `https://civiceye.lovable.app${heroImg.url}` },
      { name: "twitter:image", content: `https://civiceye.lovable.app${heroImg.url}` },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: FiCpu,
    title: "Automatic categorisation",
    text: "Each photo is classified with a confidence score, so reports reach the right department first time.",
  },
  {
    icon: FiMapPin,
    title: "Geo-tagged records",
    text: "Every report carries coordinates that feed a live OpenStreetMap view for field crews.",
  },
  {
    icon: FiActivity,
    title: "Operations dashboard",
    text: "Category and status analytics show what your city is dealing with today, this week, this month.",
  },
  {
    icon: FiShield,
    title: "Accountable workflow",
    text: "Pending, In Progress, Resolved — every status change is visible to citizen and crew alike.",
  },
  {
    icon: FiCamera,
    title: "Photo-first intake",
    text: "One picture beats a paragraph. Upload, preview and submit without any account setup.",
  },
  {
    icon: FiTrendingUp,
    title: "Recurring-issue trends",
    text: "Spot the streets that keep breaking and fix the root cause instead of the symptom.",
  },
];

const steps = [
  {
    n: "01",
    title: "Capture the problem",
    text: "Photograph the pothole, overflowing bin, leak or dark street light from where you stand.",
    image: citizenImg.url,
    alt: "Resident photographing a street problem with a smartphone",
  },
  {
    n: "02",
    title: "We do the paperwork",
    text: "CivicEye predicts the category and location, pre-fills the form and files the record.",
    image: streetlightImg.url,
    alt: "Street light against a clear city sky",
  },
  {
    n: "03",
    title: "Crews close it out",
    text: "Municipal teams pick the job off the map and mark it resolved when the work is done.",
    image: workerImg.url,
    alt: "Municipal road crew repairing a street",
  },
];

const liveIssues = [
  {
    image: potholeImg.url,
    alt: "Pothole in the middle of a residential road",
    category: "Pothole",
    status: "In Progress" as const,
    title: "Deep pothole near market crossing",
    location: "MG Road Junction",
    time: "2 hours ago",
  },
  {
    image: garbageImg.url,
    alt: "Overflowing public waste bin",
    category: "Garbage",
    status: "Pending" as const,
    title: "Bin overflowing beside the bus shelter",
    location: "Sector 12 Bus Stop",
    time: "5 hours ago",
  },
  {
    image: waterleakImg.url,
    alt: "Traffic cones marking a water leak repair on a street",
    category: "Water Leakage",
    status: "In Progress" as const,
    title: "Mains leak flooding the kerb lane",
    location: "Lakeview Avenue",
    time: "Yesterday",
  },
  {
    image: sidewalkImg.url,
    alt: "Broken pavement slabs on a city sidewalk",
    category: "Road Damage",
    status: "Resolved" as const,
    title: "Broken pavement outside the clinic",
    location: "Hospital Road",
    time: "3 days ago",
  },
];

const testimonials = [
  {
    quote:
      "We used to lose complaints in three different inboxes. Now every report arrives with a photo, a category and a location — our crews plan the whole week from it.",
    name: "Priya Nair",
    role: "Ward Officer, Municipal Corporation",
    avatar: avatar1.url,
  },
  {
    quote:
      "I reported a pothole on my walk to work and got a status update the same afternoon. That has never happened before with a city service.",
    name: "Daniel Okafor",
    role: "Resident, Green Park",
    avatar: avatar2.url,
  },
  {
    quote:
      "The dashboard finally shows us which streets fail repeatedly. We moved from patching potholes to resurfacing the roads that cause them.",
    name: "Elena Novak",
    role: "Head of Public Works",
    avatar: avatar3.url,
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative mt-3 overflow-hidden">
        <div className="mx-auto w-[min(1200px,94vw)]">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img
              src={heroImg.url}
              alt="Busy city street with traffic, shops and pedestrians"
              className="h-[520px] w-full object-cover sm:h-[560px]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.21_0.05_262_/_88%)] via-[oklch(0.21_0.05_262_/_70%)] to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-6 py-10 sm:px-12">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
                >
                  <FiShield className="h-3.5 w-3.5" /> Trusted by municipal field teams
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
                >
                  Report a city problem in under a minute.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
                >
                  Photograph a pothole, an overflowing bin or a dead street light. CivicEye
                  categorises it, pins it on the city map and gives public works teams one place to
                  resolve it.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <Link
                    to="/report"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                  >
                    Report an issue <FiArrowRight />
                  </Link>
                  <Link
                    to="/map"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    Explore the live map
                  </Link>
                </motion.div>

                <p className="mt-6 text-xs font-medium text-white/70">
                  No account needed to file a report · Average first response: 34 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-10 grid w-[min(1200px,94vw)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiCheckCircle} label="Issues resolved" value={12840} delay={0} />
        <StatCard icon={FiUsers} label="Active citizens" value={5320} delay={0.05} />
        <StatCard icon={FiClock} label="Avg. fix time (hrs)" value={34} delay={0.1} />
        <StatCard icon={FiMapPin} label="Neighbourhoods covered" value={112} delay={0.15} />
      </section>

      {/* How it works */}
      <section className="mx-auto w-[min(1200px,94vw)] py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Three steps from a photo to a fixed street
          </h2>
          <p className="mt-3 text-muted-foreground">
            No forms to chase, no reference numbers to remember. Report it, track it, see it closed.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card-hover overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <img src={s.image} alt={s.alt} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-6">
                <span className="inline-flex h-8 items-center rounded-lg bg-accent px-2.5 font-display text-sm font-bold text-accent-foreground">
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Live issues */}
      <section className="border-y border-border bg-secondary/60 py-20">
        <div className="mx-auto w-[min(1200px,94vw)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Live from the city
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                Issues reported in the last few days
              </h2>
            </div>
            <Link
              to="/reports"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Browse all reports <FiArrowRight />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {liveIssues.map((issue, i) => (
              <motion.article
                key={issue.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card-hover overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
              >
                <div className="relative">
                  <img
                    src={issue.image}
                    alt={issue.alt}
                    loading="lazy"
                    className="h-40 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold">
                    {issue.category}
                  </span>
                </div>
                <div className="p-5">
                  <StatusBadge status={issue.status} />
                  <h3 className="mt-3 text-base font-bold leading-snug">{issue.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <FiMapPin className="h-3.5 w-3.5 shrink-0" /> {issue.location}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{issue.time}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-[min(1200px,94vw)] py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Platform</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Everything a modern public works team needs
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for citizens who want to be heard and for the teams who have to act on it.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={i * 0.05}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary/60 py-20">
        <div className="mx-auto w-[min(1200px,94vw)]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What people say
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              Residents and city staff, on the same record
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-[min(1200px,94vw)] py-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-primary">
          <div className="grid items-center gap-8 p-10 md:grid-cols-[1.2fr_1fr] md:p-14">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">
                Something broken on your street?
              </h2>
              <p className="mt-3 max-w-xl text-primary-foreground/85">
                It takes under a minute. Add a photo, confirm the suggested category and submit — we
                handle the routing.
              </p>
              <Link
                to="/report"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
              >
                Start a report <FiArrowRight />
              </Link>
            </div>
            <img
              src={workerImg.url}
              alt="City maintenance crew at work on a road repair"
              loading="lazy"
              className="hidden h-56 w-full rounded-2xl object-cover md:block"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
