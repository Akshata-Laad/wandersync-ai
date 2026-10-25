-- ====================================================================
-- Personalized Travel Itinerary Planner — Supabase Database Schema
-- ====================================================================

-- 1. Profiles Table (Optional extension for Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    preferred_currency TEXT DEFAULT 'USD',
    default_travel_style TEXT DEFAULT 'balanced',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- 2. Trips Table
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INT NOT NULL CHECK (total_days > 0),
    trip_type TEXT NOT NULL CHECK (trip_type IN ('solo', 'couple', 'group', 'family')),
    group_size INT DEFAULT 1 CHECK (group_size >= 1),
    budget_level TEXT NOT NULL CHECK (budget_level IN ('budget', 'moderate', 'luxury')),
    budget_amount NUMERIC(10, 2),
    travel_style TEXT NOT NULL CHECK (travel_style IN ('relaxed', 'balanced', 'fast-paced')),
    interests TEXT[] DEFAULT '{}',
    overview TEXT,
    total_cost NUMERIC(10, 2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    itinerary_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    cost_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    logistics JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_public BOOLEAN DEFAULT false,
    share_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trips_destination ON trips(destination);
CREATE INDEX IF NOT EXISTS idx_trips_share_token ON trips(share_token);
CREATE INDEX IF NOT EXISTS idx_trips_created_at ON trips(created_at DESC);

-- Enable RLS for Trips
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- Trips Policies
CREATE POLICY "Public trips viewable by share token or public flag"
    ON trips FOR SELECT
    USING (is_public = true OR auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Authenticated users can create trips"
    ON trips FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Owners can update their trips"
    ON trips FOR UPDATE
    USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Owners can delete their trips"
    ON trips FOR DELETE
    USING (auth.uid() = user_id OR user_id IS NULL);

-- 3. Trip Collaborators Table (Scenario 3: Small Group Coordination)
CREATE TABLE IF NOT EXISTS trip_collaborators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
    invited_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trip_collab_trip_id ON trip_collaborators(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_collab_email ON trip_collaborators(email);

ALTER TABLE trip_collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collaborators can view their shared trips"
    ON trip_collaborators FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- 4. Automatic updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trips_modtime
    BEFORE UPDATE ON trips
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
