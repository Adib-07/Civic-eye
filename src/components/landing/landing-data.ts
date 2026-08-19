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
      "Capture the issue with photo and location.",
  },
  {
    key: "assign",
    label: "02 Assign",
    description: "Route responsibility to the appropriate team.",
  },
  {
    key: "track",
    label: "03 Track",
    description:
      "Monitor progress and SLA timelines.",
  },
  {
    key: "resolve",
    label: "04 Resolve",
    description: "Require evidence and work notes.",
  },
  {
    key: "verify",
    label: "05 Verify",
    description:
      "Let the reporter confirm whether the issue was actually resolved.",
  },
] as const;

export const TRUST_ITEMS = [
  "Organization-isolated data",
  "Role-based access",
  "Evidence-backed resolution",
  "Location-aware reporting",
  "Status history",
  "Resolution verification",
] as const;

export const ORG_USE_CASES = [
  {
    title: "Residential Communities",
    text: "Give residents a 30-second reporting link. Track repairs, waste collection, and lighting outages with full accountability.",
  },
  {
    title: "Universities & Campuses",
    text: "Streamline campus maintenance across academic blocks, hostels, and sports facilities with automated staff routing.",
  },
  {
    title: "Corporate & Tech Campuses",
    text: "Keep multi-building office parks operational. Assign facility tickets instantly and verify completion with photo evidence.",
  },
  {
    title: "Townships",
    text: "Centralize infrastructure maintenance across large residential townships. Monitor problem hotspots on interactive maps.",
  },
  {
    title: "Facility Operations",
    text: "Manage client SLA commitments, track vendor resolution times, and maintain a digital audit history of all repairs.",
  },
  {
    title: "Public-Sector Operations",
    text: "Route citizen reports to ward officers, track maintenance SLAs, and monitor problem hotspots across city infrastructure.",
  },
] as const;
