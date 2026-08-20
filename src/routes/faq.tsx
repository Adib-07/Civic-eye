import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — CivicEye" },
      {
        name: "description",
        content:
          "Answers about CivicEye issue management, SLA tracking, resolution verification, pricing, organization pilots, and data security.",
      },
    ],
  }),
  component: FaqPage,
});

const FAQ_SECTIONS = [
  {
    title: "Product & Capabilities",
    items: [
      {
        q: "What is CivicEye?",
        a: "CivicEye is an operational issue management platform designed for facility management companies, campuses, communities, and operations teams. It provides a single workflow for reporting, assigning, tracking, resolving, and verifying physical-space issues.",
      },
      {
        q: "Who is CivicEye for?",
        a: "CivicEye serves facility management companies, corporate and technology campuses, universities and colleges, large residential communities and townships, and public-sector operations teams. It is not a consumer complaint app.",
      },
      {
        q: "Why not use WhatsApp?",
        a: "WhatsApp is useful for quick communication but lacks structured ownership, SLA tracking, evidence requirements, and verification workflows. CivicEye provides a systematic process where every issue gets an owner, a deadline, evidence, and a verifiable resolution — things spreadsheets and chat threads cannot enforce.",
      },
      {
        q: "Can CivicEye work alongside our existing tools?",
        a: "Yes. CivicEye can complement your existing operations tools. It provides structured intake, SLA tracking, and verification that messaging apps and spreadsheets do not offer. Many organizations use CivicEye as their primary issue-management system while keeping other tools for different purposes.",
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        q: "Can we start with one site?",
        a: "Yes. The Free Pilot is designed for single-site deployments. You can evaluate CivicEye with up to 5 staff members and 100 issues per month at no cost. As your operations grow, you can expand to additional sites.",
      },
      {
        q: "How does the free pilot work?",
        a: "Organizations can start a free 30-day pilot with up to 5 staff members and 100 issue reports per month. No credit card is required. The pilot includes all core features — reporting, assignment, SLA tracking, evidence capture, and resolution verification.",
      },
      {
        q: "How does onboarding work?",
        a: "After requesting a demo, we walk you through the platform and help configure your organization, staff roles, and issue categories. Most organizations are operational within a few hours of setup.",
      },
      {
        q: "How can we request a pilot?",
        a: "Click 'Book a Demo' on our website, fill in your organization details, and our team will follow up to schedule a demonstration and set up your pilot workspace.",
      },
    ],
  },
  {
    title: "Workflow & Operations",
    items: [
      {
        q: "How are issues assigned?",
        a: "Administrators assign issues to specific staff members or teams based on category, location, or department. The assignee receives notification and is responsible for resolution within the configured SLA.",
      },
      {
        q: "How is resolution verified?",
        a: "When staff resolve an issue, they must upload photo evidence and completion notes. The reporter or a supervisor then inspects the evidence and confirms resolution or reports it as still unresolved. This ensures work is actually completed — not just marked done.",
      },
      {
        q: "Can managers monitor SLA performance?",
        a: "Yes. The operations dashboard shows open issues, SLA status (on track, approaching deadline, overdue), assigned teams, and resolution metrics. Managers can identify bottlenecks and track team performance.",
      },
      {
        q: "What happens when an issue becomes overdue?",
        a: "CivicEye tracks SLA timers per issue category. When an issue approaches or exceeds its resolution deadline, the system flags it for attention. Overdue issues are visible in the dashboard and can be escalated.",
      },
      {
        q: "Can issues include photos and location?",
        a: "Yes. Photo evidence is mandatory for resolution. Location coordinates are captured automatically via GPS when a reporter submits an issue. Both are visible to assigned staff and managers.",
      },
      {
        q: "Can different teams use CivicEye?",
        a: "Yes. Each organization can create departments or wards, assign staff to specific areas, and manage role-based access so teams only see what they are authorized to manage.",
      },
    ],
  },
  {
    title: "Security & Data",
    items: [
      {
        q: "Is organization data kept isolated?",
        a: "Yes. All organization data, staff profiles, and issue reports are isolated using database-level Row Level Security (RLS) policies and organization-scoped storage buckets. One organization's data is never accessible to another.",
      },
      {
        q: "Can users verify resolutions?",
        a: "Yes. Reporters and supervisors can confirm or reject completed work based on the photo evidence provided. This closes the accountability loop and prevents unverified closures.",
      },
      {
        q: "Can CivicEye support multiple sites?",
        a: "Yes. Community and Growth plans support multiple departments or wards within a single organization. Enterprise plans support custom configurations for multi-site deployments.",
      },
      {
        q: "Where can I learn more about security?",
        a: "Visit our Security page for details on authentication, role-based access, data isolation, database security, and file handling.",
      },
    ],
  },
];

export function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>("product-0");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container py-12 max-w-3xl">
        <div className="text-center space-y-3">
          <span className="section-label">Help & Answers</span>
          <h1 className="text-3xl font-bold sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about CivicEye for your organization.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-bold text-foreground mb-3">{section.title}</h2>
              <div className="space-y-2">
                {section.items.map((faq, i) => {
                  const key = `${section.title.toLowerCase().replace(/\s+/g, "-")}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={faq.q} className="surface-panel overflow-hidden border border-border">
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-foreground hover:bg-secondary/40 transition-colors"
                      >
                        <span className="flex items-center gap-2.5 pr-4">
                          <FiHelpCircle className="h-4 w-4 text-primary shrink-0" />
                          {faq.q}
                        </span>
                        <FiChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/50 bg-secondary/20">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center surface-panel p-8 space-y-3">
          <h3 className="text-lg font-bold text-foreground">Still have questions?</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Book a 15-minute live demonstration or speak directly with our product team.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/book-demo" className="btn-primary px-5 py-2.5 text-sm">
              Book a Demo
            </Link>
            <Link to="/pricing" className="btn-secondary px-5 py-2.5 text-sm">
              View Pricing
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
