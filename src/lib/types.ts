export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          price: number
          mileage: number
          fuel: string
          transmission: string
          body_type: string
          color: string | null
          description: string | null
          images: string[]
          is_featured: boolean
          is_sold: boolean
          monthly_est: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['vehicles']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string; created_at?: string; updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['vehicles']['Insert']>
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string
          vehicle_id: string | null
          vehicle_interest: string | null
          lead_type: string
          message: string | null
          lead_score: number
          status: string
          income_estimate: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string; created_at?: string; updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      finance_applications: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          id_number: string | null
          monthly_income: number
          employment_type: string
          employer_name: string | null
          loan_amount: number | null
          deposit: number
          loan_term_months: number
          vehicle_id: string | null
          vehicle_interest: string | null
          approval_probability: number | null
          monthly_estimate: number | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['finance_applications']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string; created_at?: string; updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['finance_applications']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          name: string
          location: string | null
          vehicle: string | null
          rating: number
          content: string
          image_url: string | null
          is_featured: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'> & {
          id?: string; created_at?: string
        }
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
    }
  }
}

export type Vehicle = Database['public']['Tables']['vehicles']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type FinanceApplication = Database['public']['Tables']['finance_applications']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
