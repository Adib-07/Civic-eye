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
  FiStar,
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
      { title: "CivicEye — Report Civic Issues in Your Ward in a Minute" },
      {
        name: "description",
        content:
          "Report potholes, garbage, water leaks and dark street lights with one photo. CivicEye categorises each complaint and routes it to the right municipal ward team.",
      },
      { property: "og:title", content: "CivicEye — Report Civic Issues in Your Ward in a Minute" },
      {
        property: "og:description",
        content:
          "Photo-first civic reporting for Indian cities: categorise the issue, pin it on the map, track the fix.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    text: "Every photo is classified with a confidence score, so complaints reach the right ward department the first time.",
  },
  {
    icon: FiMapPin,
    title: "Geo-tagged records",
    text: "Each report carries coordinates that feed a live OpenStreetMap view for field staff and junior engineers.",
  },
  {
    icon: FiActivity,
    title: "Ward operations view",
    text: "Category and status analytics show what your ward is dealing with today, this week and this month.",
  },
  {
    icon: FiShield,
    title: "Accountable workflow",
    text: "Pending, In Progress, Resolved — every status change stays visible to the resident and the crew alike.",
  },
  {
    icon: FiCamera,
    title: "Works on any phone",
    text: "Built for 4G on a budget Android. One photo, one tap, no login and no long forms.",
  },
  {
    icon: FiTrendingUp,
    title: "Repeat-issue trends",
    text: "Spot the lanes that break every monsoon and fix the root cause instead of patching it again.",
  },
];

const steps = [
  {
    n: "01",
    title: "Click a photo",
    text: "Photograph the pothole, overflowing bin, leaking pipeline or dark street light from where you are standing.",
    image: citizenImg.url,
    alt: "Resident in Pune photographing a pothole on her street with a smartphone",
  },
  {
    n: "02",
    title: "We fill the complaint",
    text: "CivicEye predicts the category, picks up the location, fills the form and files it against your ward.",
    image: streetlightImg.url,
    alt: "Unlit street light on a residential lane in India at dusk",
  },
  {
    n: "03",
    title: "Ward crew closes it",
    text: "Municipal teams pick the job off the map and mark it resolved once the work on ground is done.",
    image: workerImg.url,
    alt: "Municipal road crew patching a road in an Indian city",
  },
];

const liveIssues = [
  {
    image: potholeImg.url,
    alt: "Water-filled pothole on an Indian residential road",
    category: "Pothole",
    status: "In Progress" as const,
    title: "Deep pothole near the sabzi mandi crossing",
    location: "MG Road Junction, Ward 14",
    time: "2 hours ago",
  },
  {
    image: garbageImg.url,
    alt: "Overflowing Nagar Nigam garbage bin on an Indian street corner",
    category: "Garbage",
    status: "Pending" as const,
    title: "Nagar Nigam bin overflowing at the bus stop",
    location: "Sector 12 Bus Stop, Ward 7",
    time: "5 hours ago",
  },
  {
    image: waterleakImg.url,
    alt: "Burst water pipeline flooding a street in an Indian city",
    category: "Water Leakage",
    status: "In Progress" as const,
    title: "Pipeline burst flooding the service lane",
    location: "Anna Nagar 3rd Street, Ward 21",
    time: "Yesterday",
  },
  {
    image: sidewalkImg.url,
    alt: "Broken paver-block footpath on an Indian city sidewalk",
    category: "Road Damage",
    status: "Resolved" as const,
    title: "Broken paver blocks outside the PHC",
    location: "Hospital Road, Ward 9",
    time: "3 days ago",
  },
];

const testimonials = [
  {
    quote:
      "Complaints used to arrive on WhatsApp, phone calls and paper. Now each one comes with a photo, a category and a location, and my ward crew plans the whole week from it.",
    name: "Priya Nair",
    role: "Ward Officer, Municipal Corporation",
    avatar: avatar1.url,
  },
  {
    quote:
      "I reported a pothole on my way to office and got a status update the same evening. That has honestly never happened with a civic complaint before.",
    name: "Rahul Deshmukh",
    role: "Resident, Kothrud",
    avatar: avatar2.url,
  },
  {
    quote:
      "The dashboard finally shows which lanes fail every monsoon. We moved from repeat patchwork to resurfacing the stretches that keep breaking.",
    name: "S. Venkatesan",
    role: "Executive Engineer, Public Works",
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
          <div className="relative overflow-hidden rounded-2xl border border-border sm:rounded-3xl">
            <img
              src={heroImg.url}
              alt="Busy Indian city street with auto-rickshaws, two-wheelers and shopfronts"
              width={1920}
              height={900}
              className="h-[440px] w-full object-cover sm:h-[520px] lg:h-[560px]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.21_0.05_262_/_82%)] via-[oklch(0.21_0.05_262_/_74%)] to-[oklch(0.21_0.05_262_/_55%)] sm:bg-gradient-to-r sm:from-[oklch(0.21_0.05_262_/_90%)] sm:via-[oklch(0.21_0.05_262_/_70%)] sm:to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-5 py-8 sm:px-10 lg:px-12">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm sm:text-xs"
                >
                  <FiShield className="h-3.5 w-3.5 shrink-0" /> Used by ward teams in 12 wards
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mt-4 max-w-2xl font-display text-[1.75rem] font-extrabold leading-[1.12] text-white sm:mt-5 sm:text-4xl lg:text-[3.25rem]"
                >
                  Report a civic problem in your ward in under a minute.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:text-lg"
                >
                  Click a photo of a pothole, an overflowing bin, a leaking pipeline or a dark street
                  light. CivicEye categorises it, pins it on the city map and gives the municipal
                  team one place to resolve it.
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
                    Report an issue <FiArrowRight />
                  </Link>
                  <Link
                    to="/map"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    See the live map
                  </Link>
                </motion.div>

                <p className="mt-5 max-w-md text-[11px] font-medium leading-relaxed text-white/70 sm:mt-6 sm:text-xs">
                  No login needed to file a complaint · Average first response: 2 working days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-8 grid w-[min(1200px,94vw)] grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={FiCheckCircle} label="Issues resolved" value={320} suffix="+" delay={0} />
        <StatCard icon={FiUsers} label="Residents reporting" value={850} suffix="+" delay={0.05} />
        <StatCard
          icon={FiStar}
          label="Citizen rating"
          value={4.7}
          decimals={1}
          suffix="/5"
          delay={0.1}
        />
        <StatCard icon={FiMapPin} label="Wards covered" value={12} delay={0.15} />
      </section>

      {/* How it works */}
      <section className="mx-auto w-[min(1200px,94vw)] py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            How it works
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            Three steps from a photo to a fixed street
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            No forms to chase and no complaint number to remember. Report it, track it, see it
            closed.
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
              className="card-hover overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] sm:last:odd:col-span-2 lg:last:odd:col-span-1"
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
      </section>

      {/* Live issues */}
      <section className="border-y border-border bg-secondary/60 py-14 sm:py-20">
        <div className="mx-auto w-[min(1200px,94vw)]">
          <div className="grid gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Live from the city
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
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

          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-4">
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
                    width={1200}
                    height={800}
                    className="h-40 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold">
                    {issue.category}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <StatusBadge status={issue.status} />
                  <h3 className="mt-3 text-base font-bold leading-snug">{issue.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <FiMapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="min-w-0 truncate">{issue.location}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{issue.time}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-[min(1200px,94vw)] py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Platform
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            Everything a municipal ward team needs
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Built for residents who want to be heard, and for the teams who have to act on it.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={i * 0.05}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold sm:text-lg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary/60 py-14 sm:py-20">
        <div className="mx-auto w-[min(1200px,94vw)]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              What people say
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Residents and ward staff, on the same record
            </h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 sm:last:odd:col-span-2 lg:last:odd:col-span-1"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <img
                    src={t.avatar}
                    alt={`${t.name}, ${t.role}`}
                    loading="lazy"
                    width={384}
                    height={384}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
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
      <section className="mx-auto w-[min(1200px,94vw)] py-14 sm:py-20">
        <div className="overflow-hidden rounded-2xl border border-border bg-primary sm:rounded-3xl">
          <div className="grid items-center gap-8 p-7 sm:p-10 md:grid-cols-[1.2fr_1fr] md:p-14">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-primary-foreground sm:text-3xl lg:text-4xl">
                Something broken on your street?
              </h2>
              <p className="mt-3 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
                It takes under a minute. Add a photo, confirm the suggested category and submit — we
                handle the routing to your ward office.
              </p>
              <Link
                to="/report"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.02] sm:mt-8"
              >
                Start a report <FiArrowRight />
              </Link>
            </div>
            <img
              src={workerImg.url}
              alt="Municipal maintenance crew repairing a road in India"
              loading="lazy"
              width={1200}
              height={800}
              className="hidden h-56 w-full rounded-2xl object-cover md:block"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
