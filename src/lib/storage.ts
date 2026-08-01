import garbageImg from "@/assets/garbage.jpg.asset.json";
import potholeImg from "@/assets/pothole.jpg.asset.json";
import streetlightImg from "@/assets/streetlight.jpg.asset.json";
import type { Category, Report, Status } from "./types";


const KEY = "civiceye_reports";

function isBrowser() {
  return typeof window !== "undefined";
}

const SEED: Report[] = [
  {
    id: "seed-1",
    title: "Deep pothole near the sabzi mandi crossing",
    description:
      "A large water-filled pothole has formed at the junction and two-wheelers are swerving dangerously during peak hours.",
    category: "Pothole",
    location: "MG Road Junction, Ward 14",
    lat: 28.6139,
    lng: 77.209,
    image: potholeImg.url,
    status: "Pending",
    aiCategory: "Pothole",
    aiConfidence: 96,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    title: "Nagar Nigam bin overflowing at the bus stop",
    description:
      "Waste has not been lifted for four days. Strong smell and stray animals around the bus shelter.",
    category: "Garbage",
    location: "Sector 12 Bus Stop, Ward 7",
    lat: 28.6219,
    lng: 77.2185,
    image: garbageImg.url,
    status: "In Progress",
    aiCategory: "Garbage",
    aiConfidence: 95,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "seed-3",
    title: "Street lights out on the entire lane",
    description:
      "Six poles in a row stay dark after 7 pm, making the lane unsafe for women walking home.",
    category: "Broken Street Light",
    location: "Gandhi Nagar 2nd Lane, Ward 9",
    lat: 28.6045,
    lng: 77.2005,
    image: streetlightImg.url,
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
