import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Vehicle = {
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

export type Lead = {
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

export type FinanceApplication = {
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

export type Testimonial = {
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
