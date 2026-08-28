export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = "citizen" | "ward_officer" | "admin" | "super_admin";
export type SlaPriority = "low" | "normal" | "high" | "critical";
export type ReportStatus = "Pending" | "In Progress" | "Resolved" | "Verified" | "Closed" | "Reopened";
export type VerificationStatus = "approved" | "rejected" | "pending";
export type NotificationChannel = "in_app" | "email" | "sms" | "whatsapp";

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          public_reports: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          public_reports?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          public_reports?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      subscription_plans: {
        Row: {
          tier: string;
          name: string;
          max_staff: number | null;
          max_reports_per_month: number | null;
          max_departments: number | null;
          created_at: string;
        };
        Insert: {
          tier: string;
          name: string;
          max_staff?: number | null;
          max_reports_per_month?: number | null;
          max_departments?: number | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          max_staff?: number | null;
          max_reports_per_month?: number | null;
          max_departments?: number | null;
        };
        Relationships: [];
      };
      organization_subscriptions: {
        Row: {
          id: string;
          organization_id: string;
          plan_tier: string;
          status: string;
          started_at: string;
          current_period_end: string | null;
          trial_ends_at: string | null;
          billing_provider: string | null;
          billing_external_id: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          plan_tier?: string;
          status?: string;
          started_at?: string;
          current_period_end?: string | null;
          trial_ends_at?: string | null;
          billing_provider?: string | null;
          billing_external_id?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          plan_tier?: string;
          status?: string;
          current_period_end?: string | null;
          trial_ends_at?: string | null;
          billing_provider?: string | null;
          billing_external_id?: string | null;
          metadata?: Json;
        };
        Relationships: [];
      };
      organization_onboarding: {
        Row: {
          id: string;
          organization_id: string | null;
          org_name: string;
          org_type: string;
          admin_name: string;
          admin_email: string;
          team_size: string | null;
          operational_area: string | null;
          selected_plan: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id?: string | null;
          org_name: string;
          org_type: string;
          admin_name: string;
          admin_email: string;
          team_size?: string | null;
          operational_area?: string | null;
          selected_plan?: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          organization_id?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      departments: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          code: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          code?: string | null;
          created_at?: string;
        };
        Update: {
          organization_id?: string;
          name?: string;
          code?: string | null;
        };
        Relationships: [];
      };
      wards: {
        Row: {
          id: string;
          organization_id: string;
          department_id: string | null;
          name: string;
          code: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          department_id?: string | null;
          name: string;
          code?: string | null;
          created_at?: string;
        };
        Update: {
          department_id?: string | null;
          name?: string;
          code?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          organization_id: string | null;
          department_id: string | null;
          role: UserRole;
          full_name: string | null;
          email: string | null;
          categories: string[] | null;
          created_at: string;
        };
        Insert: {
          id: string;
          organization_id?: string | null;
          department_id?: string | null;
          role?: UserRole;
          full_name?: string | null;
          email?: string | null;
          categories?: string[] | null;
          created_at?: string;
        };
        Update: {
          organization_id?: string | null;
          department_id?: string | null;
          role?: UserRole;
          full_name?: string | null;
          email?: string | null;
          categories?: string[] | null;
        };
        Relationships: [];
      };
      sla_policies: {
        Row: {
          id: string;
          organization_id: string;
          category: string;
          priority: SlaPriority;
          response_hours: number;
          resolution_hours: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          category: string;
          priority?: SlaPriority;
          response_hours?: number;
          resolution_hours?: number;
          created_at?: string;
        };
        Update: {
          category?: string;
          priority?: SlaPriority;
          response_hours?: number;
          resolution_hours?: number;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          organization_id: string;
          ward_id: string | null;
          department_id: string | null;
          title: string;
          description: string;
          category: string;
          location: string;
          lat: number;
          lng: number;
          image_url: string | null;
          status: ReportStatus;
          ai_category: string | null;
          ai_confidence: number | null;
          created_by: string | null;
          assigned_to: string | null;
          assigned_at: string | null;
          assigned_by: string | null;
          sla_due_at: string | null;
          sla_breached: boolean;
          resolved_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          ward_id?: string | null;
          department_id?: string | null;
          title: string;
          description: string;
          category: string;
          location: string;
          lat: number;
          lng: number;
          image_url?: string | null;
          status?: ReportStatus;
          ai_category?: string | null;
          ai_confidence?: number | null;
          created_by?: string | null;
          assigned_to?: string | null;
          assigned_at?: string | null;
          assigned_by?: string | null;
          sla_due_at?: string | null;
          sla_breached?: boolean;
          resolved_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
        Relationships: [];
      };
      issue_evidence: {
        Row: {
          id: string;
          report_id: string;
          storage_path: string;
          public_url: string | null;
          content_type: string | null;
          uploaded_by: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          storage_path: string;
          public_url?: string | null;
          content_type?: string | null;
          uploaded_by?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          public_url?: string | null;
          content_type?: string | null;
          notes?: string | null;
        };
        Relationships: [];
      };
      issue_status_history: {
        Row: {
          id: string;
          report_id: string;
          from_status: string | null;
          to_status: string;
          changed_by: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          from_status?: string | null;
          to_status: string;
          changed_by?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          notes?: string | null;
        };
        Relationships: [];
      };
      resolution_verifications: {
        Row: {
          id: string;
          report_id: string;
          verified_by: string;
          status: VerificationStatus;
          notes: string | null;
          verification_image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          verified_by: string;
          status: VerificationStatus;
          notes?: string | null;
          verification_image_url?: string | null;
          created_at?: string;
        };
        Update: {
          status?: VerificationStatus;
          notes?: string | null;
          verification_image_url?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string | null;
          channel: NotificationChannel;
          subject: string | null;
          body: string | null;
          payload: Json;
          read_at: string | null;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id?: string | null;
          channel: NotificationChannel;
          subject?: string | null;
          body?: string | null;
          payload?: Json;
          read_at?: string | null;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          read_at?: string | null;
          sent_at?: string | null;
          payload?: Json;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          organization_id: string | null;
          actor_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id?: string | null;
          actor_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          [_ in never]: never;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      mark_sla_breaches: {
        Args: Record<string, never>;
        Returns: undefined;
      };
      is_org_staff: {
        Args: { org_id: string };
        Returns: boolean;
      };
      org_subscription_active: {
        Args: { org_id: string };
        Returns: boolean;
      };
      org_can_create_report: {
        Args: { org_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

/** Civic issue row (stored in `reports` table). */
export type DbReport = Database["public"]["Tables"]["reports"]["Row"];
export type DbProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type DbOrganization = Database["public"]["Tables"]["organizations"]["Row"];
export type DbDepartment = Database["public"]["Tables"]["departments"]["Row"];
export type DbIssueEvidence = Database["public"]["Tables"]["issue_evidence"]["Row"];
export type DbIssueStatusHistory = Database["public"]["Tables"]["issue_status_history"]["Row"];
export type DbAuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];
export type DbNotification = Database["public"]["Tables"]["notifications"]["Row"];
