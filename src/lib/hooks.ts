import { useEffect, useState } from "react";
import { getReports } from "./storage";
import type { Report } from "./types";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = () => setReports(getReports());
    sync();
    setLoading(false);
    window.addEventListener("civiceye:reports", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("civiceye:reports", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { reports, loading };
}

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("civiceye_theme");
    const isDark = stored ? stored === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("civiceye_theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}

export function useCountUp(value: number, duration = 900) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
