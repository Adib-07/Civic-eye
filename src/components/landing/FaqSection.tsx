import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What is CivicEye?",
    answer:
      "CivicEye is an operational issue management platform designed for facility managers, campuses, townships, and residential communities to report, assign, track, and verify local physical issues from one accountable workflow.",
  },
  {
    question: "Who is CivicEye for?",
    answer:
      "CivicEye serves facility management companies, corporate and technology campuses, universities and colleges, large residential communities and townships, and public-sector operations teams.",
  },
  {
    question: "Can we start with one site?",
    answer:
      "Yes. Organizations typically begin with a single site or building during the pilot period and expand as the workflow matures.",
  },
  {
    question: "How does issue assignment work?",
    answer:
      "Administrators route issues to the appropriate team based on category, location, and availability. Ownership is explicit and recorded.",
  },
  {
    question: "How does SLA tracking work?",
    answer:
      "Configurable resolution timelines per category with automatic breach alerts for overdue tasks.",
  },
  {
    question: "Can issues include photos and location?",
    answer:
      "Yes. Reports include mandatory photo evidence and automatic GPS location capture via a lightweight web form.",
  },
  {
    question: "How is resolution verified?",
    answer:
      "When staff resolve an issue, they upload photo evidence and completion notes. The reporter or supervisor then confirms or rejects the resolution.",
  },
  {
    question: "How do we start a pilot?",
    answer:
      "Book a demo or contact our team. The free pilot includes up to 5 staff members and 100 issues per month for 30 days.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-secondary/30 border-y border-border py-16 lg:py-24">
      <div className="page-container">
        <p className="section-label centered">FAQ</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight centered">
          Frequently asked questions
        </h2>

        <div className="max-w-3xl mx-auto mt-10">
          <Accordion type="multiple" defaultValue={FAQS.map((_, index) => `faq-${index}`)}>
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-sm font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed pb-4">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
