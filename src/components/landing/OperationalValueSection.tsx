import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiEye, FiCheckCircle, FiClock, FiUserCheck } from "react-icons/fi";

const valueProps = [
  { icon: FiEye, bold: "Know what is open.", desc: "Every issue in one queue." },
  { icon: FiUserCheck, bold: "Know who owns it.", desc: "Explicit assignment per issue." },
  { icon: FiClock, bold: "Know what is overdue.", desc: "SLA timers surface breaches." },
  { icon: FiCheckCircle, bold: "Know what was resolved.", desc: "Evidence and verification required." },
];

export function OperationalValueSection() {
  return (
    <section className="bg-background py-14 lg:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">OPERATIONAL VALUE</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Give your operations team visibility from report to resolution.
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {valueProps.map((v) => (
            <div key={v.bold} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <v.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">{v.bold}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/book-demo" className="btn-primary inline-flex items-center gap-2">
            Book a Demo
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
