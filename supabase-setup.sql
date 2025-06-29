-- Supabase Database Setup for Unlimited Visitor Count
-- Run this in your Supabase SQL Editor

-- Create the visitor_counts table first
CREATE TABLE IF NOT EXISTS visitor_counts (
    id SERIAL PRIMARY KEY,
    site_id VARCHAR(255) NOT NULL UNIQUE,
    count BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create active_viewers table for real-time viewer tracking
CREATE TABLE IF NOT EXISTS active_viewers (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    site_id VARCHAR(255) NOT NULL,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, site_id)
);

-- Now drop existing policies if they exist (after tables are created)
DROP POLICY IF EXISTS "Allow all operations for visitor counts" ON visitor_counts;
DROP POLICY IF EXISTS "Allow all operations for active viewers" ON active_viewers;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitor_counts_site_id ON visitor_counts(site_id);
CREATE INDEX IF NOT EXISTS idx_active_viewers_site_id ON active_viewers(site_id);
CREATE INDEX IF NOT EXISTS idx_active_viewers_last_seen ON active_viewers(last_seen);
CREATE INDEX IF NOT EXISTS idx_active_viewers_session_site ON active_viewers(session_id, site_id);

-- Create a function for atomic increment (handles concurrent requests safely)
CREATE OR REPLACE FUNCTION increment_visitor_count(site_id_param VARCHAR)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    -- Insert or update atomically
    INSERT INTO visitor_counts (site_id, count, created_at, updated_at)
    VALUES (site_id_param, 1, NOW(), NOW())
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
ALTER TABLE active_viewers ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations (for visitor counting)
CREATE POLICY "Allow all operations for visitor counts" ON visitor_counts
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for active viewers" ON active_viewers
    FOR ALL USING (true);

-- Insert initial record for your site
INSERT INTO visitor_counts (site_id, count, created_at, updated_at)
VALUES ('main-site', 0, NOW(), NOW())
ON CONFLICT (site_id) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON visitor_counts TO anon;
GRANT ALL ON active_viewers TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Create a function to clean up old active viewers (optional)
CREATE OR REPLACE FUNCTION cleanup_old_active_viewers()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- Remove viewers who haven't been active for more than 10 minutes
    DELETE FROM active_viewers 
    WHERE last_seen < NOW() - INTERVAL '10 minutes';
END;
$$;

-- Optional: Set up a scheduled job to clean up old active viewers
-- This requires pg_cron extension to be enabled in Supabase
-- SELECT cron.schedule('cleanup-active-viewers', '*/5 * * * *', 'SELECT cleanup_old_active_viewers();'); 