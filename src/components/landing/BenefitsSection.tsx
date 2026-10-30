import {
  FiBarChart2,
  FiCamera,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiUserCheck,
} from "react-icons/fi";

import { BENEFITS } from "@/components/landing/landing-data";

const ICONS = {
  layers: FiLayers,
  "user-check": FiUserCheck,
  clock: FiClock,
  camera: FiCamera,
  "check-circle": FiCheckCircle,
  "bar-chart": FiBarChart2,
} as const;

export function BenefitsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Benefits</p>
          <h2 className="mt-2 section-title text-2xl sm:text-3xl">
            Everything your operations team needs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            CivicEye is not just a complaint form — it is issue-management software your
            organization runs every day.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon =
              benefit.icon in ICONS ? ICONS[benefit.icon as keyof typeof ICONS] : FiLayers;
            return (
              <article key={benefit.title} className="landing-feature-card p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
