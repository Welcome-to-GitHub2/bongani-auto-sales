export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      finance_applications: {
        Row: {
          approval_probability: number | null
          created_at: string
          deposit: number
          email: string
          employer_name: string | null
          employment_type: string
          full_name: string
          id: string
          id_number: string | null
          loan_amount: number | null
          loan_term_months: number
          monthly_estimate: number | null
          monthly_income: number
          notes: string | null
          phone: string
          status: string
          updated_at: string
          vehicle_id: string | null
          vehicle_interest: string | null
        }
        Insert: {
          approval_probability?: number | null
          created_at?: string
          deposit?: number
          email: string
          employer_name?: string | null
          employment_type?: string
          full_name: string
          id?: string
          id_number?: string | null
          loan_amount?: number | null
          loan_term_months?: number
          monthly_estimate?: number | null
          monthly_income: number
          notes?: string | null
          phone: string
          status?: string
          updated_at?: string
          vehicle_id?: string | null
          vehicle_interest?: string | null
        }
        Update: {
          approval_probability?: number | null
          created_at?: string
          deposit?: number
          email?: string
          employer_name?: string | null
          employment_type?: string
          full_name?: string
          id?: string
          id_number?: string | null
          loan_amount?: number | null
          loan_term_months?: number
          monthly_estimate?: number | null
          monthly_income?: number
          notes?: string | null
          phone?: string
          status?: string
          updated_at?: string
          vehicle_id?: string | null
          vehicle_interest?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "finance_applications_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: string
          income_estimate: number | null
          lead_score: number
          lead_type: string
          message: string | null
          name: string
          phone: string
          status: string
          updated_at: string
          vehicle_id: string | null
          vehicle_interest: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          income_estimate?: number | null
          lead_score?: number
          lead_type?: string
          message?: string | null
          name: string
          phone: string
          status?: string
          updated_at?: string
          vehicle_id?: string | null
          vehicle_interest?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          income_estimate?: number | null
          lead_score?: number
          lead_type?: string
          message?: string | null
          name?: string
          phone?: string
          status?: string
          updated_at?: string
          vehicle_id?: string | null
          vehicle_interest?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          is_featured: boolean
          location: string | null
          name: string
          rating: number
          vehicle: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location?: string | null
          name: string
          rating?: number
          vehicle?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location?: string | null
          name?: string
          rating?: number
          vehicle?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          body_type: string
          color: string | null
          created_at: string
          description: string | null
          fuel: string
          id: string
          images: string[]
          is_featured: boolean
          is_sold: boolean
          make: string
          mileage: number
          model: string
          monthly_est: number | null
          price: number
          transmission: string
          updated_at: string
          year: number
        }
        Insert: {
          body_type?: string
          color?: string | null
          created_at?: string
          description?: string | null
          fuel?: string
          id?: string
          images?: string[]
          is_featured?: boolean
          is_sold?: boolean
          make: string
          mileage?: number
          model: string
          monthly_est?: number | null
          price: number
          transmission?: string
          updated_at?: string
          year: number
        }
        Update: {
          body_type?: string
          color?: string | null
          created_at?: string
          description?: string | null
          fuel?: string
          id?: string
          images?: string[]
          is_featured?: boolean
          is_sold?: boolean
          make?: string
          mileage?: number
          model?: string
          monthly_est?: number | null
          price?: number
          transmission?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
