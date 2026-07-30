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
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicEye — AI City Problem Reporter" },
      {
        name: "description",
        content:
          "Report potholes, garbage, leaks and broken lights in seconds. CivicEye classifies each photo with AI and maps it for city teams.",
      },
      { property: "og:title", content: "CivicEye — AI City Problem Reporter" },
      {
        property: "og:description",
        content: "Snap a civic issue, let AI classify it, and track the fix on a live city map.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: FiCpu,
    title: "AI issue classification",
    text: "Every upload is instantly categorised with a confidence score, so nothing gets mis-routed.",
  },
  {
    icon: FiMapPin,
    title: "Geo-tagged reports",
    text: "Latitude and longitude on every report power a live OpenStreetMap view for field crews.",
  },
  {
    icon: FiActivity,
    title: "Real-time dashboard",
    text: "Pie and bar analytics show what your city is dealing with today, this week, this month.",
  },
  {
    icon: FiShield,
    title: "Accountable workflow",
    text: "Pending, In Progress, Resolved — status changes are visible to everyone involved.",
  },
  {
    icon: FiCamera,
    title: "Photo-first reporting",
    text: "One picture beats a paragraph. Preview, crop-free upload and instant image modal.",
  },
  {
    icon: FiTrendingUp,
    title: "Insightful trends",
    text: "Spot the streets that keep breaking and fix root causes instead of symptoms.",
  },
];

const steps = [
  {
    n: "01",
    title: "Capture the problem",
    text: "Take a photo of the pothole, overflowing bin, leak or dark street light.",
  },
  {
    n: "02",
    title: "AI does the paperwork",
    text: "CivicEye predicts the category with a confidence score and pre-fills your form.",
  },
  {
    n: "03",
    title: "City teams resolve it",
    text: "Reports land on the map and dashboard where crews mark them resolved.",
  },
];

function Landing() {
  return (
    <div className="hero-bg min-h-screen">
      <Navbar />

      <section className="mx-auto grid w-[min(1200px,94vw)] items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-primary"
          >
            <FiCpu className="h-3.5 w-3.5" /> AI-powered civic intelligence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl"
          >
            Your city has problems. <span className="text-gradient">CivicEye sees them.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Snap a photo of a pothole, a pile of garbage or a dead street light. CivicEye classifies
            it, pins it on the map, and gives city teams a single dashboard to resolve it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/report"
              className="bg-brand inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
            >
              Report an issue <FiArrowRight />
            </Link>
            <Link
              to="/map"
              className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
            >
              Explore the map
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Live AI analysis</p>
            <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
              97% confidence
            </span>
          </div>
          <div className="mt-4 grid h-40 place-items-center rounded-2xl bg-secondary text-muted-foreground">
            <FiCamera className="h-10 w-10" />
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Detected category", "Broken Street Light"],
              ["Location", "Green Park Lane"],
              ["Priority", "High"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="truncate font-bold">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid w-[min(1200px,94vw)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiCheckCircle} label="Issues resolved" value={12840} delay={0} />
        <StatCard icon={FiUsers} label="Active citizens" value={5320} accent="text-accent" delay={0.05} />
        <StatCard icon={FiClock} label="Avg. fix time (hrs)" value={34} accent="text-warning" delay={0.1} />
        <StatCard icon={FiMapPin} label="Neighbourhoods" value={112} accent="text-primary" delay={0.15} />
      </section>

      <section className="mx-auto w-[min(1200px,94vw)] py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Everything a modern city reporting stack needs
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for citizens who want to be heard and teams who need to act fast.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={i * 0.05}>
              <span className="bg-brand grid h-11 w-11 place-items-center rounded-xl text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,94vw)] pb-8">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <GlassCard key={s.n} delay={i * 0.08}>
              <span className="text-gradient font-display text-4xl font-extrabold">{s.n}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,94vw)] py-16">
        <GlassCard className="flex flex-col items-center gap-5 p-10 text-center">
          <h2 className="font-display text-3xl font-extrabold">Ready to fix your street?</h2>
          <p className="max-w-xl text-muted-foreground">
            It takes under a minute. Add a photo, confirm the AI category and submit.
          </p>
          <Link
            to="/report"
            className="bg-brand inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Start a report <FiArrowRight />
          </Link>
        </GlassCard>
      </section>

      <Footer />
    </div>
  );
}
