import type { Category } from "./types";

/** Filename-keyword classifier (P3 will replace with real vision API). */
export function predictCategory(filename: string): { category: Category; confidence: number } {
  const name = filename.toLowerCase();
  if (name.includes("pothole")) return { category: "Pothole", confidence: 96 };
  if (name.includes("garbage")) return { category: "Garbage", confidence: 95 };
  if (name.includes("tree")) return { category: "Fallen Tree", confidence: 94 };
  if (name.includes("water")) return { category: "Water Leakage", confidence: 93 };
  if (name.includes("light")) return { category: "Broken Street Light", confidence: 97 };
  return { category: "Road Damage", confidence: 90 };
}
