import type { Category } from "./types";

const TITLE_TEMPLATES: Record<Category, string> = {
  Pothole: "Pothole on the road",
  Garbage: "Garbage / waste issue",
  "Fallen Tree": "Fallen tree blocking the way",
  "Water Leakage": "Water leak or flooding",
  "Broken Street Light": "Street light not working",
  "Road Damage": "Road damage or broken surface",
};

const DESCRIPTION_TEMPLATES: Record<Category, string> = {
  Pothole: "A pothole was spotted and needs repair. It may be unsafe for vehicles and pedestrians.",
  Garbage: "Waste or an overflowing bin needs collection. There may be smell or hygiene concerns.",
  "Fallen Tree": "A fallen tree or branch is blocking the road or footpath.",
  "Water Leakage": "Water is leaking or pooling on the street and needs urgent attention.",
  "Broken Street Light": "Street lighting is out, making the area unsafe after dark.",
  "Road Damage": "The road surface is damaged and may cause accidents.",
};

export function suggestTitle(category: Category): string {
  return TITLE_TEMPLATES[category];
}

export function suggestDescription(category: Category): string {
  return DESCRIPTION_TEMPLATES[category];
}

export function suggestLocationLabel(): string {
  return "Near my current location";
}

/** Minimum fields needed for a valid quick report. */
export function buildQuickReportPayload(input: {
  category: Category;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  location?: string;
}) {
  return {
    title: input.title?.trim() || suggestTitle(input.category),
    description: input.description?.trim() || suggestDescription(input.category),
    location: input.location?.trim() || suggestLocationLabel(),
    lat: input.lat,
    lng: input.lng,
    category: input.category,
  };
}

export type GeoStatus = "idle" | "loading" | "ready" | "denied" | "unsupported";

export function requestDeviceLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 60_000 },
    );
  });
}
