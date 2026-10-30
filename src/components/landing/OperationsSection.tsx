import { SOLUTIONS } from "@/components/landing/landing-data";

export function OperationsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Built for operators</p>
          <h2 className="mt-2 section-title text-2xl sm:text-3xl">
            Built for teams responsible for real-world spaces
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            CivicEye serves facility management companies, universities, corporate campuses,
            townships, and operations teams &mdash; not consumer complaint apps.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((item) => (
            <article key={item.title} className="landing-feature-card p-5">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
