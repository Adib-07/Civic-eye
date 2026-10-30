import { Link } from "@tanstack/react-router";
import { FiArrowRight, FiEye, FiCheckCircle, FiClock, FiUserCheck } from "react-icons/fi";

const valueProps = [
  { icon: FiEye, bold: "Know what is open.", desc: "Every issue in one queue." },
  { icon: FiUserCheck, bold: "Know who owns it.", desc: "Explicit assignment per issue." },
  { icon: FiClock, bold: "Know what is overdue.", desc: "SLA timers surface breaches." },
  {
    icon: FiCheckCircle,
    bold: "Know what was resolved.",
    desc: "Evidence and verification required.",
  },
] as const;

export function OperationalValueSection() {
  return (
    <section className="page-section bg-background">
      <div className="container">
        <div className="section-header-center animate-slide-up">
          <p className="caption">OPERATIONAL VALUE</p>
          <h2 className="mt-4 headline-2">
            Give your operations team visibility from report to resolution.
          </h2>
        </div>

        <div className="mt-16 grid-auto-fit">
          {valueProps.map((v, index) => (
            <div
              key={v.bold}
              className="card p-6 flex items-start gap-5 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="icon-wrapper-lg icon-wrapper-primary shrink-0">
                <v.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="headline-4">{v.bold}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center animate-slide-up stagger-3">
          <Link to="/book-demo" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5">
            Book a Demo
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
