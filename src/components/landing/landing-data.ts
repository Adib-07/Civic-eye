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
    label: "Report",
    description: "Residents submit geo-tagged issues with photo evidence — no account required.",
  },
  {
    key: "verify",
    label: "Verify",
    description: "Staff validate intake, category, and location before routing to the right team.",
  },
  {
    key: "assign",
    label: "Assign",
    description: "Route issues to ward officers or facilities teams within your organization.",
  },
  {
    key: "track",
    label: "Track",
    description: "Monitor SLA deadlines, status history, and assignments in one operations view.",
  },
  {
    key: "resolve",
    label: "Resolve",
    description: "Close the loop with resolution updates and citizen verification.",
  },
] as const;

export const TRUST_ITEMS = [
  "Organization-scoped data isolation",
  "Role-based staff access",
  "Geo-tagged evidence & audit trail",
  "SLA tracking built in",
] as const;

export const ORG_USE_CASES = [
  {
    title: "Municipalities",
    text: "Ward-level intake, assignment, and resolution for streets, lighting, waste, and water.",
  },
  {
    title: "Campuses & institutions",
    text: "Facilities teams manage maintenance requests with evidence and status history.",
  },
  {
    title: "Communities & estates",
    text: "Residents report in seconds; management committees triage transparently.",
  },
  {
    title: "Facility operators",
    text: "Track issues across sites with map visibility and operational accountability.",
  },
] as const;
