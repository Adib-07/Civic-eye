export const CATEGORIES = [
  "Pothole",
  "Garbage",
  "Fallen Tree",
  "Water Leakage",
  "Broken Street Light",
  "Road Damage",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const STATUSES = ["Pending", "In Progress", "Resolved", "Verified", "Closed"] as const;

export type Status = (typeof STATUSES)[number];

export const USER_ROLES = ["citizen", "ward_officer", "admin", "super_admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface Report {
  id: string;
  organizationId: string;
  wardId: string | null;
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
  createdBy: string | null;
  assignedTo: string | null;
  assignedAt: string | null;
  assignedBy: string | null;
  assigneeName: string | null;
  slaDueAt: string | null;
  slaBreached: boolean;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  organizationId: string | null;
  role: UserRole;
  fullName: string | null;
  email: string | null;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
}

export interface StaffMember {
  id: string;
  fullName: string | null;
  email: string | null;
  role: UserRole;
}

export interface SlaPolicy {
  id: string;
  category: Category;
  priority: string;
  responseHours: number;
  resolutionHours: number;
}

export interface CreateReportInput {
  title: string;
  description: string;
  category: Category;
  location: string;
  lat: number;
  lng: number;
  imageFile?: File | null;
  imagePreview?: string | null;
  aiCategory: Category | null;
  aiConfidence: number | null;
  wardId?: string | null;
}

export function isStaffRole(role: UserRole | null | undefined): boolean {
  return role === "ward_officer" || role === "admin" || role === "super_admin";
}

export function canManageReports(role: UserRole | null | undefined): boolean {
  return isStaffRole(role);
}

export function canVerifyResolution(role: UserRole | null | undefined): boolean {
  return role === "admin" || role === "super_admin" || role === "ward_officer";
}

/** Citizens may verify issues they reported once staff marks them Resolved. */
export function canVerifyReport(
  role: UserRole | null | undefined,
  report: { status: Status; createdBy: string | null },
  userId: string | null | undefined,
): boolean {
  if (canVerifyResolution(role)) return true;
  if (!userId || report.status !== "Resolved") return false;
  return report.createdBy === userId || report.createdBy === null;
}

export function isAwaitingCitizenVerification(status: Status): boolean {
  return status === "Resolved";
}
