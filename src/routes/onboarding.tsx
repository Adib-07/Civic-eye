import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiCamera, FiCheckCircle, FiMap, FiUsers } from "react-icons/fi";

import { AppShell } from "@/components/AppShell";
import { dismissOnboarding } from "@/components/OnboardingBanner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{ title: "Quick Tour — CivicEye" }],
  }),
  component: OnboardingPage,
});

const steps = [
  {
    icon: FiCamera,
    title: "Report with a photo",
    text: "Open Report Issue, upload a photo, and confirm the suggested category. Your team receives a geo-tagged record instantly.",
    to: "/report" as const,
    cta: "Try reporting",
  },
  {
    icon: FiMap,
    title: "Track on the live map",
    text: "Every submitted issue appears on the OpenStreetMap view with its status, category, and location pin.",
    to: "/map" as const,
    cta: "Open map",
  },
  {
    icon: FiUsers,
    title: "Staff assign and resolve",
    text: "Staff sign in, assign issues from the queue, mark work complete, and verify fixes before closing.",
    to: "/login" as const,
    cta: "Staff sign in",
  },
  {
    icon: FiCheckCircle,
    title: "SLA tracking built in",
    text: "The organization dashboard shows SLA deadlines, breaches, and a verification queue so nothing slips through.",
    to: "/dashboard" as const,
    cta: "View dashboard",
  },
];

function OnboardingPage() {
  return (
    <AppShell title="Quick tour" subtitle="Get started with CivicEye in four steps">
      <div className="grid gap-5 sm:grid-cols-2">
        {steps.map((step, i) => (
          <motion.article
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass card-hover flex flex-col rounded-2xl p-6"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
              <step.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-bold">{step.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            <Link
              to={step.to}
              onClick={dismissOnboarding}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              {step.cta} <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={dismissOnboarding}
          className="text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          Got it — hide this tour
        </button>
      </div>
    </AppShell>
  );
}
