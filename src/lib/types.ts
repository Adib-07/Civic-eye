export const CATEGORIES = [
  "Pothole",
  "Garbage",
  "Fallen Tree",
  "Water Leakage",
  "Broken Street Light",
  "Road Damage",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const STATUSES = ["Pending", "In Progress", "Resolved"] as const;
export type Status = (typeof STATUSES)[number];

export interface Report {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  lat: number;
  lng: number;
  image: string | null;
  status: Status;
  aiCategory: Category | null;
  aiConfidence: number | null;
  createdAt: string;
}
