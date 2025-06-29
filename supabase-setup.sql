-- Supabase Database Setup for Unlimited Visitor Count
-- Run this in your Supabase SQL Editor

-- Create the visitor_counts table
CREATE TABLE IF NOT EXISTS visitor_counts (
    id SERIAL PRIMARY KEY,
    site_id TEXT UNIQUE NOT NULL,
    count BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_visitor_counts_site_id ON visitor_counts(site_id);

-- Create a function for atomic increment (handles concurrent requests safely)
CREATE OR REPLACE FUNCTION increment_visitor_count(site_id_param TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    -- Insert or update atomically
    INSERT INTO visitor_counts (site_id, count, updated_at)
    VALUES (site_id_param, 1, NOW())
    ON CONFLICT (site_id)
    DO UPDATE SET 
        count = visitor_counts.count + 1,
        updated_at = NOW()
    RETURNING count INTO new_count;
    
    RETURN new_count;
END;
$$;

-- Enable Row Level Security (RLS) for security
ALTER TABLE visitor_counts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for visitor counting)
CREATE POLICY "Allow all operations for visitor counts" ON visitor_counts
    FOR ALL USING (true);

-- Insert initial record for your site
INSERT INTO visitor_counts (site_id, count) 
VALUES ('main-site', 0)
ON CONFLICT (site_id) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON visitor_counts TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon; 