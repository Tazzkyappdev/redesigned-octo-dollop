import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la landing page
export interface LandingLead {
  id: string
  email: string
  full_name: string
  interest_type: 'client' | 'professional'
  category?: string
  message?: string
  notification_preference?: boolean
  created_at: Date
  updated_at?: Date
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  is_active: boolean
  sort_order?: number
  created_at: Date
  updated_at?: Date
}

export interface Professional {
  id: string
  business_name: string
  description?: string
  rating?: number
  total_reviews?: number
  services_count?: number
  avatar_url?: string
  category?: string
  is_featured?: boolean
  created_at: Date
  updated_at?: Date
}

export interface ProfessionalApplication {
  id: string
  full_name: string
  email: string
  phone?: string
  category: string
  subcategories?: string[]
  experience_years: number
  portfolio_url?: string
  description?: string
  availability: 'full-time' | 'part-time'
  status?: 'pending' | 'approved' | 'rejected'
  created_at: Date
  updated_at?: Date
}

export interface Testimonial {
  id: string
  author_name: string
  author_role?: string
  content: string
  rating?: number
  is_featured?: boolean
  created_at: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  sort_order?: number
  is_active?: boolean
  created_at: Date
}

// Tipos para formularios
export interface LeadFormData {
  email: string
  full_name: string
  interest_type: 'client' | 'professional'
  category?: string
  message?: string
  notification_preference?: boolean
}

export interface ProfessionalFormData {
  full_name: string
  email: string
  phone?: string
  category: string
  subcategories?: string[]
  experience_years: number
  portfolio_url?: string
  description?: string
  availability: 'full-time' | 'part-time'
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: any
}

export interface LandingStats {
  totalLeads: number
  totalProfessionals: number
  clientLeads: number
  professionalLeads: number
}

