import type { Category } from "./types";

const KEY = "civiceye_session";

export interface Session {
  username: string;
  loginAt: string;
}

export function login(username: string, password: string): boolean {
  if (username.trim() === "admin" && password === "admin123") {
    localStorage.setItem(
      KEY,
      JSON.stringify({ username: "admin", loginAt: new Date().toISOString() }),
    );
    window.dispatchEvent(new Event("civiceye:auth"));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("civiceye:auth"));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

/** Filename-keyword "AI" classifier. */
export function predictCategory(filename: string): { category: Category; confidence: number } {
  const name = filename.toLowerCase();
  if (name.includes("pothole")) return { category: "Pothole", confidence: 96 };
  if (name.includes("garbage")) return { category: "Garbage", confidence: 95 };
  if (name.includes("tree")) return { category: "Fallen Tree", confidence: 94 };
  if (name.includes("water")) return { category: "Water Leakage", confidence: 93 };
  if (name.includes("light")) return { category: "Broken Street Light", confidence: 97 };
  return { category: "Road Damage", confidence: 90 };
}
