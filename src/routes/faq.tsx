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
      { name: "description", content: "Common questions about CivicEye issue reporting, organization pilots, pricing, SLA tracking, and resolution verification." },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "What is CivicEye?",
    a: "CivicEye is an operational issue management platform designed for residential communities (RWAs), university campuses, townships, and facility managers to report, assign, track, and verify local physical issues from one place.",
  },
  {
    q: "Do residents/citizens pay to report issues?",
    a: "No. Community members and residents report issues for free. Organizations subscribe to the platform to manage their staff operations queue, SLA compliance, and verification workflows.",
  },
  {
    q: "How does resolution verification work?",
    a: "When staff resolve an issue, they are required to upload photo evidence and completion notes. The reporting citizen then inspects the evidence and clicks 'Confirm Resolution' or 'Report Still Unresolved' to ensure genuine work was done.",
  },
  {
    q: "Can CivicEye be used for university campuses or housing societies?",
    a: "Yes! CivicEye is specifically tailored for RWAs, college campuses, townships, and commercial facilities rather than municipal government bureaucracy.",
  },
  {
    q: "How does the 30-day pilot work?",
    a: "Organizations can start a free 30-day pilot with up to 5 staff members and 100 issue reports per month. No credit card is required to begin.",
  },
  {
    q: "Is organization data kept isolated?",
    a: "Yes. All organization data, staff profiles, and issue reports are isolated using database-level Row Level Security (RLS) policies and private signed storage buckets.",
  },
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container py-12 max-w-3xl">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            Help & Answers
          </span>
          <h1 className="text-3xl font-bold sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about CivicEye for your organization.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="surface-panel rounded-2xl overflow-hidden border border-border">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-foreground hover:bg-secondary/40 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FiHelpCircle className="h-4 w-4 text-primary shrink-0" />
                    {faq.q}
                  </span>
                  <FiChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 bg-secondary/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center surface-panel p-8 rounded-2xl space-y-3">
          <h3 className="text-lg font-bold text-foreground">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Book a 15-minute live demonstration or speak directly with our product team.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/book-demo" className="btn-primary text-xs px-4 py-2">
              Book a Demo
            </Link>
            <Link to="/pricing" className="btn-secondary text-xs px-4 py-2">
              View Pricing
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
