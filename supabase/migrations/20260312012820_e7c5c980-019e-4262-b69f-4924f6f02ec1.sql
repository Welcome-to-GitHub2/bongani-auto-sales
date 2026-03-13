
-- ─── VEHICLES TABLE ────────────────────────────────────────────────────────
CREATE TABLE public.vehicles (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  make         TEXT NOT NULL,
  model        TEXT NOT NULL,
  year         INTEGER NOT NULL,
  price        NUMERIC(12,2) NOT NULL,
  mileage      INTEGER NOT NULL DEFAULT 0,
  fuel         TEXT NOT NULL DEFAULT 'Petrol',
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  body_type    TEXT NOT NULL DEFAULT 'Sedan',
  color        TEXT,
  description  TEXT,
  images       TEXT[] NOT NULL DEFAULT '{}',
  is_featured  BOOLEAN NOT NULL DEFAULT false,
  is_sold      BOOLEAN NOT NULL DEFAULT false,
  monthly_est  NUMERIC(10,2),
  created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicles are publicly viewable" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Admins can insert vehicles" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update vehicles" ON public.vehicles FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete vehicles" ON public.vehicles FOR DELETE USING (auth.uid() IS NOT NULL);

-- ─── LEADS TABLE ──────────────────────────────────────────────────────────
CREATE TABLE public.leads (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT,
  phone           TEXT NOT NULL,
  vehicle_id      UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  vehicle_interest TEXT,
  lead_type       TEXT NOT NULL DEFAULT 'inquiry',
  message         TEXT,
  lead_score      INTEGER NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'new',
  income_estimate NUMERIC(12,2),
  created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all leads" ON public.leads FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE USING (auth.uid() IS NOT NULL);

-- ─── FINANCE APPLICATIONS TABLE ───────────────────────────────────────────
CREATE TABLE public.finance_applications (
  id                 UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name          TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  id_number          TEXT,
  monthly_income     NUMERIC(12,2) NOT NULL,
  employment_type    TEXT NOT NULL DEFAULT 'employed',
  employer_name      TEXT,
  loan_amount        NUMERIC(12,2),
  deposit            NUMERIC(12,2) NOT NULL DEFAULT 0,
  loan_term_months   INTEGER NOT NULL DEFAULT 72,
  vehicle_id         UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  vehicle_interest   TEXT,
  approval_probability INTEGER,
  monthly_estimate   NUMERIC(10,2),
  status             TEXT NOT NULL DEFAULT 'pending',
  notes              TEXT,
  created_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.finance_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit finance applications" ON public.finance_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view finance applications" ON public.finance_applications FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update finance applications" ON public.finance_applications FOR UPDATE USING (auth.uid() IS NOT NULL);

-- ─── TESTIMONIALS TABLE ───────────────────────────────────────────────────
CREATE TABLE public.testimonials (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  location   TEXT,
  vehicle    TEXT,
  rating     INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  content    TEXT NOT NULL,
  image_url  TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Testimonials are publicly viewable" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (auth.uid() IS NOT NULL);

-- ─── UPDATED_AT TRIGGER ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_finance_applications_updated_at BEFORE UPDATE ON public.finance_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ─── INDEXES ──────────────────────────────────────────────────────────────
CREATE INDEX idx_vehicles_make_model ON public.vehicles (make, model);
CREATE INDEX idx_vehicles_price ON public.vehicles (price);
CREATE INDEX idx_vehicles_body_type ON public.vehicles (body_type);
CREATE INDEX idx_vehicles_featured ON public.vehicles (is_featured) WHERE is_featured = true;
CREATE INDEX idx_leads_status ON public.leads (status);
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_finance_status ON public.finance_applications (status);
