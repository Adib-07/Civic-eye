import type { Status } from "@/lib/types";

export type DemoIssue = {
  id: string;
  title: string;
  category: string;
  location: string;
  status: Status;
  priority: "High" | "Medium" | "Low";
  sla: string;
  assignee: string | null;
  reported: string;
  mapX: number;
  mapY: number;
  markerColor: string;
};

/** Illustrative demo data for marketing previews only — not live Supabase records. */
export const DEMO_ISSUES: DemoIssue[] = [
  {
    id: "a4f2b891",
    title: "Pothole — MG Road Junction",
    category: "Pothole",
    location: "MG Road Junction, Ward 12",
    status: "Pending",
    priority: "High",
    sla: "18h left",
    assignee: null,
    reported: "2h ago",
    mapX: 28,
    mapY: 62,
    markerColor: "#f59e0b",
  },
  {
    id: "c91d004a",
    title: "Streetlight outage — North perimeter",
    category: "Broken Street Light",
    location: "North perimeter, Sector 4",
    status: "In Progress",
    priority: "Medium",
    sla: "2d left",
    assignee: "Facilities Team A",
    reported: "6h ago",
    mapX: 72,
    mapY: 34,
    markerColor: "#2563eb",
  },
  {
    id: "e22b7710",
    title: "Overflowing waste bin — Ward 14",
    category: "Garbage",
    location: "Ward 14 market lane",
    status: "In Progress",
    priority: "Medium",
    sla: "1d left",
    assignee: "Sanitation Unit",
    reported: "Yesterday",
    mapX: 54,
    mapY: 78,
    markerColor: "#2563eb",
  },
  {
    id: "b8c3e112",
    title: "Water leak — Pump Station",
    category: "Water Leakage",
    location: "Pump Station, Block C",
    status: "Resolved",
    priority: "High",
    sla: "On track",
    assignee: "Water Works",
    reported: "2d ago",
    mapX: 38,
    mapY: 28,
    markerColor: "#16a34a",
  },
  {
    id: "d4a901fc",
    title: "Road damage — Service lane",
    category: "Road Damage",
    location: "East service lane",
    status: "Verified",
    priority: "Low",
    sla: "Closed",
    assignee: "Roads Dept.",
    reported: "4d ago",
    mapX: 82,
    mapY: 58,
    markerColor: "#16a34a",
  },
];

export const WORKFLOW_STEPS = [
  {
    key: "report",
    label: "01 Report",
    description:
      "Capture the issue with photo, location, and category — via a lightweight web form. No app install required.",
  },
  {
    key: "assign",
    label: "02 Assign",
    description:
      "Route responsibility to the appropriate team or officer based on category and location.",
  },
  {
    key: "track",
    label: "03 Track",
    description:
      "Monitor progress with SLA timers, status updates, and real-time queue visibility.",
  },
  {
    key: "resolve",
    label: "04 Resolve",
    description: "Require photo evidence and work notes before an issue can be marked complete.",
  },
  {
    key: "verify",
    label: "05 Verify",
    description:
      "Let the reporter or supervisor confirm whether the issue was actually resolved — closing the accountability loop.",
  },
] as const;

export const TRUST_ITEMS = [
  "Organization-isolated data",
  "Role-based access",
  "Evidence-backed resolution",
  "SLA tracking",
  "Location-aware reporting",
  "Resolution verification",
] as const;

export const BENEFITS = [
  {
    title: "Centralized Issue Management",
    description:
      "Replace scattered emails, WhatsApp threads, and spreadsheets with a single structured intake system for all operational issues.",
    icon: "layers" as const,
  },
  {
    title: "Clear Ownership",
    description:
      "Every issue gets assigned to a specific team or officer. No ambiguity about who is responsible for resolution.",
    icon: "user-check" as const,
  },
  {
    title: "SLA Tracking",
    description:
      "Configurable resolution timelines per category with automatic breach alerts. Know exactly what is overdue and what is on track.",
    icon: "clock" as const,
  },
  {
    title: "Evidence-Based Resolution",
    description:
      "Staff must upload photo evidence and completion notes before marking an issue resolved. No more unverified closures.",
    icon: "camera" as const,
  },
  {
    title: "Resolution Verification",
    description:
      "Reporters and supervisors confirm or reject completed work — ensuring accountability at the final step.",
    icon: "check-circle" as const,
  },
  {
    title: "Operational Analytics",
    description:
      "Dashboard KPIs, category breakdowns, and SLA compliance metrics give operations teams full visibility into performance.",
    icon: "bar-chart" as const,
  },
] as const;

export const SOLUTIONS = [
  {
    title: "Facility Management",
    description:
      "Designed for facility management companies managing client SLAs. Track vendor resolution times, maintain digital audit trails, and demonstrate compliance with contractual obligations.",
    icon: "building" as const,
    audience: "Facility managers and operations teams",
  },
  {
    title: "Corporate & Technology Campuses",
    description:
      "Keep multi-building office parks operational. Assign facility tickets instantly, monitor maintenance SLAs across buildings, and verify completion with photo evidence.",
    icon: "briefcase" as const,
    audience: "Campus operations and workplace teams",
  },
  {
    title: "Universities & Colleges",
    description:
      "Streamline campus maintenance across academic blocks, hostels, labs, and sports facilities. Students and staff report issues; operations teams track and resolve with full accountability.",
    icon: "book-open" as const,
    audience: "University administration and maintenance",
  },
  {
    title: "Large Communities & Townships",
    description:
      "Centralize infrastructure maintenance across large residential townships. From potholes to streetlights to waste management — monitor problem hotspots on interactive maps.",
    icon: "map" as const,
    audience: "RWA boards, township administrators",
  },
] as const;

export const PLATFORM_FEATURES = [
  {
    title: "Photo-first Reporting",
    description:
      "Citizens and staff submit issues with mandatory photo evidence and automatic GPS location — no app installation needed.",
  },
  {
    title: "Structured Intake",
    description:
      "Every report includes category, description, coordinates, and evidence — giving field teams complete context before dispatch.",
  },
  {
    title: "Operations Dashboard",
    description:
      "Staff see open issues, SLA status, assignments, and resolution queues scoped to their organization and role.",
  },
  {
    title: "Organization Isolation",
    description:
      "Database-level row security keeps each organization's issues, staff, and files completely separate.",
  },
  {
    title: "Verify Before Close",
    description:
      "Resolved work must be confirmed or sent back — a clear audit trail that ensures accountability.",
  },
  {
    title: "Map-Ready Records",
    description:
      "Geo-tagged issues feed an interactive map view so field crews know exactly where to go.",
  },
] as const;

export const FAQS = [
  {
    q: "What is CivicEye?",
    a: "CivicEye is an operational issue management platform designed for facility managers, campuses, townships, and residential communities to report, assign, track, and verify local physical issues from one accountable workflow.",
  },
  {
    q: "Who is CivicEye for?",
    a: "CivicEye serves facility management companies, corporate and technology campuses, universities and colleges, large residential communities and townships, and public-sector operations teams.",
  },
  {
    q: "Do residents or reporters pay to report issues?",
    a: "No. Community members and residents report issues for free via a lightweight web form. Organizations subscribe to manage their staff operations queue, SLA compliance, and verification workflows.",
  },
  {
    q: "How does resolution verification work?",
    a: "When staff resolve an issue, they upload photo evidence and completion notes. The reporter or supervisor then inspects the evidence and confirms resolution or reports it as still unresolved.",
  },
  {
    q: "How does the free pilot work?",
    a: "Organizations can start a free 30-day pilot with up to 5 staff members and 100 issue reports per month. No credit card is required to begin.",
  },
  {
    q: "Is organization data kept isolated?",
    a: "Yes. All organization data, staff profiles, and issue reports are isolated using database-level Row Level Security (RLS) policies and organization-scoped storage.",
  },
] as const;
