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
    label: "1. Report",
    description:
      "Citizens & staff submit geo-tagged issues with photo evidence and GPS location pin.",
  },
  {
    key: "route",
    label: "2. Route",
    description: "System and ward managers triage intake and route to responsible departments.",
  },
  {
    key: "act",
    label: "3. Act",
    description:
      "Field teams & ward officers receive assignments and act with SLA countdown timers.",
  },
  {
    key: "verify",
    label: "4. Verify",
    description: "Staff log resolution evidence and citizens or supervisors verify completion.",
  },
  {
    key: "analyze",
    label: "5. Analyze",
    description:
      "Operations dashboard tracks SLA compliance, bottleneck wards, and resolution trends.",
  },
] as const;

export const TRUST_ITEMS = [
  "Organization-scoped data isolation",
  "Role-based staff access (RBAC)",
  "Geo-tagged photo & audit log",
  "Automated SLA tracking & alerts",
] as const;

export const ORG_USE_CASES = [
  {
    title: "Municipalities & Wards",
    text: "Route citizen reports directly to ward officers, track maintenance SLAs, and monitor city-wide problem hotspots on live maps.",
  },
  {
    title: "University & Corporate Campuses",
    text: "Campus facilities teams manage lighting, sanitation, and safety reports with fast dispatch and verified sign-offs.",
  },
  {
    title: "Housing Societies & Townships",
    text: "Gated communities and residential estates give residents a 30-second issue reporting channel with management accountability.",
  },
  {
    title: "Facility & Infrastructure Operators",
    text: "Track multi-site asset defects, assign maintenance contractors, and maintain a verifiable resolution audit history.",
  },
] as const;
