import type { Category, Report, Status } from "./types";

const KEY = "civiceye_reports";

function isBrowser() {
  return typeof window !== "undefined";
}

const SEED: Report[] = [
  {
    id: "seed-1",
    title: "Deep pothole near market crossing",
    description:
      "A large pothole has formed at the junction and is causing two-wheelers to swerve dangerously during rush hour.",
    category: "Pothole",
    location: "MG Road Junction",
    lat: 28.6139,
    lng: 77.209,
    image: null,
    status: "Pending",
    aiCategory: "Pothole",
    aiConfidence: 96,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    title: "Garbage piling up beside bus stop",
    description:
      "Uncollected waste for the past four days. Strong smell and stray animals around the bus shelter.",
    category: "Garbage",
    location: "Sector 12 Bus Stop",
    lat: 28.6219,
    lng: 77.2185,
    image: null,
    status: "In Progress",
    aiCategory: "Garbage",
    aiConfidence: 95,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-3",
    title: "Street light out on the whole lane",
    description: "Six consecutive poles are dark after 7pm, making the walkway unsafe.",
    category: "Broken Street Light",
    location: "Green Park Lane",
    lat: 28.6045,
    lng: 77.2005,
    image: null,
    status: "Resolved",
    aiCategory: "Broken Street Light",
    aiConfidence: 97,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

export function getReports(): Report[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw) as Report[];
  } catch {
    return [];
  }
}

function persist(reports: Report[]) {
  if (!isBrowser()) return;
  localStorage.setItem(KEY, JSON.stringify(reports));
  window.dispatchEvent(new Event("civiceye:reports"));
}

export function addReport(data: Omit<Report, "id" | "createdAt" | "status">): Report {
  const report: Report = {
    ...data,
    id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  persist([report, ...getReports()]);
  return report;
}

export function updateReport(id: string, patch: Partial<Report>) {
  persist(getReports().map((r) => (r.id === id ? { ...r, ...patch } : r)));
}

export function deleteReport(id: string) {
  persist(getReports().filter((r) => r.id !== id));
}

export function setStatus(id: string, status: Status) {
  updateReport(id, { status });
}

export function countByCategory(reports: Report[]): Record<Category, number> {
  return reports.reduce(
    (acc, r) => {
      acc[r.category] = (acc[r.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<Category, number>,
  );
}

export function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}
