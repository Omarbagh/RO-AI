/**
 * Hand-maintained types mirroring supabase/migrations/0001_init.sql.
 *
 * Once the Supabase CLI is wired up you can regenerate this with:
 *   supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
 * Until then, keep this in sync with the migrations by hand.
 */
import type { ResumeData } from "@/lib/resume/schema";

export type PlanTier = "free" | "pro";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "unpaid";

export type AiFeature =
  | "rewrite_bullets"
  | "generate_summary"
  | "ats_score"
  | "tailor_job"
  | "cover_letter";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          template_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          template_id?: string;
        };
        Update: Partial<{
          title: string;
          template_id: string;
        }>;
        Relationships: [];
      };
      resume_content: {
        Row: {
          resume_id: string;
          data: ResumeData;
          updated_at: string;
        };
        Insert: {
          resume_id: string;
          data: ResumeData;
        };
        Update: Partial<{
          data: ResumeData;
        }>;
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: PlanTier;
          status: SubscriptionStatus;
          provider: string;
          mollie_customer_id: string | null;
          mollie_subscription_id: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          plan?: PlanTier;
          status?: SubscriptionStatus;
          provider?: string;
          mollie_customer_id?: string | null;
          mollie_subscription_id?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Insert"]>;
        Relationships: [];
      };
      ai_usage: {
        Row: {
          id: string;
          user_id: string;
          feature: AiFeature;
          input_tokens: number;
          output_tokens: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          feature: AiFeature;
          input_tokens?: number;
          output_tokens?: number;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      plan_tier: PlanTier;
      subscription_status: SubscriptionStatus;
      ai_feature: AiFeature;
    };
  };
}
