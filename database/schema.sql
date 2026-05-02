-- ============================================================
--  NKUMU MUSIC — PostgreSQL Database Schema
--  CAMUCA Certification Authority
--  Version 1.0 | Registered in Ontario, Canada
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search

-- ============================================================
--  ENUMS
-- ============================================================

CREATE TYPE user_role       AS ENUM ('fan', 'artist', 'label', 'admin');
CREATE TYPE account_status  AS ENUM ('active', 'suspended', 'pending_verification', 'deactivated');
CREATE TYPE subscription    AS ENUM ('free', 'fan_premium', 'artist_pro', 'label_enterprise');
CREATE TYPE content_type    AS ENUM ('single', 'ep', 'album', 'mixtape', 'live');
CREATE TYPE release_status  AS ENUM ('draft', 'scheduled', 'pre_order', 'published', 'archived');
CREATE TYPE cert_level      AS ENUM ('bronze', 'silver', 'gold', 'platinum', 'diamond');
CREATE TYPE payment_status  AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE payment_method  AS ENUM ('orange_money', 'mtn_mobile_money', 'stripe', 'paypal', 'wise');
CREATE TYPE award_category  AS ENUM (
  'song_of_year', 'album_of_year', 'best_new_artist', 'artist_of_year',
  'best_makossa', 'best_bikutsi', 'best_afrobeat', 'best_gospel',
  'best_hiphop_cm', 'best_zouk', 'best_coupe_decale',
  'most_streamed_artist', 'diaspora_artist', 'best_collaboration',
  'producer_of_year', 'video_of_year'
);
CREATE TYPE event_type      AS ENUM ('concert', 'festival', 'meet_greet', 'listening_party', 'ceremony');
CREATE TYPE genre           AS ENUM (
  'makossa', 'bikutsi', 'afrobeat', 'gospel', 'hiphop_cm',
  'zouk', 'coupe_decale', 'ndombolo', 'folk', 'rnb', 'electronic', 'other'
);

-- ============================================================
--  CORE: USERS
-- ============================================================

CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email               VARCHAR(255) UNIQUE NOT NULL,
  email_verified      BOOLEAN DEFAULT FALSE,
  password_hash       TEXT,
  role                user_role DEFAULT 'fan',
  status              account_status DEFAULT 'active',
  subscription_plan   subscription DEFAULT 'free',
  subscription_ends   TIMESTAMPTZ,
  display_name        VARCHAR(100) NOT NULL,
  username            VARCHAR(50) UNIQUE,
  bio                 TEXT,
  avatar_url          TEXT,
  banner_url          TEXT,
  location_country    VARCHAR(80),
  location_city       VARCHAR(80),
  phone               VARCHAR(30),
  preferred_language  VARCHAR(10) DEFAULT 'fr',
  -- Stripe / payment
  stripe_customer_id  VARCHAR(100),
  -- Payout info (for artists)
  payout_method       payment_method,
  payout_details      JSONB,          -- encrypted phone/account number
  -- Meta
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  last_login          TIMESTAMPTZ
);

-- Artist extended profile (only for users where role = 'artist' or 'label')
CREATE TABLE artist_profiles (
  user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  stage_name          VARCHAR(100) NOT NULL,
  real_name           VARCHAR(100),
  genres              genre[],
  is_verified         BOOLEAN DEFAULT FALSE,
  verified_at         TIMESTAMPTZ,
  bio_long            TEXT,
  website_url         VARCHAR(255),
  instagram_url       VARCHAR(255),
  tiktok_url          VARCHAR(255),
  youtube_url         VARCHAR(255),
  facebook_url        VARCHAR(255),
  twitter_url         VARCHAR(255),
  monthly_listeners   INTEGER DEFAULT 0,
  total_streams       BIGINT DEFAULT 0,
  total_followers     INTEGER DEFAULT 0,
  label_id            UUID,             -- FK added below after labels table
  management_contact  VARCHAR(255),
  booking_email       VARCHAR(255),
  press_kit_url       TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Label profiles
CREATE TABLE labels (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id       UUID REFERENCES users(id),
  name                VARCHAR(150) NOT NULL,
  slug                VARCHAR(100) UNIQUE NOT NULL,
  logo_url            TEXT,
  description         TEXT,
  website_url         VARCHAR(255),
  country             VARCHAR(80),
  founded_year        SMALLINT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE artist_profiles
  ADD CONSTRAINT fk_artist_label
  FOREIGN KEY (label_id) REFERENCES labels(id);

-- Follows (fan → artist)
CREATE TABLE follows (
  follower_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  followed_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, followed_id)
);

-- ============================================================
--  CONTENT: RELEASES & TRACKS
-- ============================================================

CREATE TABLE releases (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label_id            UUID REFERENCES labels(id),
  title               VARCHAR(255) NOT NULL,
  slug                VARCHAR(255),
  content_type        content_type NOT NULL,
  status              release_status DEFAULT 'draft',
  cover_art_url       TEXT,
  description         TEXT,
  genre               genre,
  secondary_genre     genre,
  language            VARCHAR(20) DEFAULT 'fr',
  release_date        DATE,
  preorder_start      DATE,
  preorder_price_xaf  INTEGER,         -- price in CFA Francs
  preorder_price_cad  NUMERIC(8,2),
  buy_price_xaf       INTEGER,
  buy_price_cad       NUMERIC(8,2),
  allow_download      BOOLEAN DEFAULT FALSE,
  total_streams       BIGINT DEFAULT 0,
  total_purchases     INTEGER DEFAULT 0,
  total_preorders     INTEGER DEFAULT 0,
  -- CAMUCA Certification (auto-computed, stored for performance)
  certification       cert_level,
  certified_at        TIMESTAMPTZ,
  -- Meta
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  published_at        TIMESTAMPTZ
);

CREATE TABLE tracks (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  release_id          UUID NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
  artist_id           UUID NOT NULL REFERENCES users(id),
  title               VARCHAR(255) NOT NULL,
  track_number        SMALLINT,
  duration_seconds    INTEGER NOT NULL,
  audio_url           TEXT NOT NULL,         -- CDN URL (Cloudflare R2)
  audio_hq_url        TEXT,                  -- 320kbps version
  lyrics              TEXT,
  is_explicit         BOOLEAN DEFAULT FALSE,
  is_streaming_only   BOOLEAN DEFAULT TRUE,  -- cannot be downloaded unless purchased
  isrc_code           VARCHAR(20),           -- International Standard Recording Code
  total_streams       BIGINT DEFAULT 0,
  total_purchases     INTEGER DEFAULT 0,
  -- CAMUCA Certification for individual track
  certification       cert_level,
  certified_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Featured artists on a track (collaborations)
CREATE TABLE track_artists (
  track_id            UUID REFERENCES tracks(id) ON DELETE CASCADE,
  artist_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  role                VARCHAR(50) DEFAULT 'featured',  -- 'featured', 'producer', 'songwriter'
  PRIMARY KEY (track_id, artist_id)
);

-- ============================================================
--  STREAMING & PLAYS
-- ============================================================

CREATE TABLE stream_events (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_id            UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  user_id             UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id          VARCHAR(100),           -- for anonymous / guest streams
  -- Anti-fraud: must be >= 30 seconds to count as 1 stream
  duration_played     INTEGER NOT NULL,       -- seconds actually played
  counted             BOOLEAN DEFAULT FALSE,  -- true if >= 30 seconds
  -- Geo data (from IP)
  country_code        VARCHAR(5),
  city                VARCHAR(80),
  -- Device
  platform            VARCHAR(30),            -- 'web', 'ios', 'android', 'pwa'
  user_agent          TEXT,
  ip_hash             VARCHAR(64),            -- hashed for privacy
  streamed_at         TIMESTAMPTZ DEFAULT NOW()
);

-- Aggregated daily stream counts (for performance — updated by background job)
CREATE TABLE stream_daily_totals (
  track_id            UUID REFERENCES tracks(id) ON DELETE CASCADE,
  date                DATE NOT NULL,
  stream_count        INTEGER DEFAULT 0,
  unique_listeners    INTEGER DEFAULT 0,
  PRIMARY KEY (track_id, date)
);

-- ============================================================
--  PURCHASES & PRE-ORDERS
-- ============================================================

CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID REFERENCES users(id) ON DELETE SET NULL,
  -- What was bought
  release_id          UUID REFERENCES releases(id),
  track_id            UUID REFERENCES tracks(id),
  is_preorder         BOOLEAN DEFAULT FALSE,
  -- Pricing
  amount_xaf          INTEGER,
  amount_cad          NUMERIC(8,2),
  currency            VARCHAR(5) DEFAULT 'XAF',
  -- Payment
  payment_status      payment_status DEFAULT 'pending',
  payment_method      payment_method,
  payment_reference   VARCHAR(255),           -- provider transaction ID
  stripe_payment_id   VARCHAR(255),
  -- Payout to artist (80% of amount)
  artist_payout_xaf   INTEGER,
  artist_paid_at      TIMESTAMPTZ,
  -- Meta
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  completed_at        TIMESTAMPTZ
);

-- ============================================================
--  SUBSCRIPTIONS
-- ============================================================

CREATE TABLE subscription_payments (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan                subscription NOT NULL,
  amount_xaf          INTEGER,
  amount_cad          NUMERIC(8,2),
  currency            VARCHAR(5) DEFAULT 'XAF',
  payment_method      payment_method,
  payment_reference   VARCHAR(255),
  stripe_invoice_id   VARCHAR(255),
  period_start        DATE,
  period_end          DATE,
  status              payment_status DEFAULT 'pending',
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
--  CAMUCA CERTIFICATIONS
-- ============================================================

CREATE TABLE certifications (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id           UUID NOT NULL REFERENCES users(id),
  track_id            UUID REFERENCES tracks(id),
  release_id          UUID REFERENCES releases(id),
  -- Exactly one of track_id or release_id must be set
  level               cert_level NOT NULL,
  stream_count_at_cert BIGINT NOT NULL,       -- exact count when certified
  certified_at        TIMESTAMPTZ DEFAULT NOW(),
  -- Physical plaque
  plaque_requested    BOOLEAN DEFAULT FALSE,
  plaque_shipped      BOOLEAN DEFAULT FALSE,
  plaque_tracking_no  VARCHAR(100),
  plaque_shipped_at   TIMESTAMPTZ,
  plaque_address      JSONB,                  -- shipping address (encrypted)
  -- Certificate
  certificate_url     TEXT,                   -- PDF URL
  shareable_card_url  TEXT,                   -- social media image
  -- Verification
  camuca_reference    VARCHAR(50) UNIQUE,     -- e.g. CAMUCA-2025-PT-001
  verified_by         UUID REFERENCES users(id),
  is_public           BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Public CAMUCA Registry (queryable by anyone)
CREATE VIEW camuca_registry AS
  SELECT
    c.camuca_reference,
    ap.stage_name AS artist_name,
    COALESCE(t.title, r.title) AS song_title,
    c.level,
    c.stream_count_at_cert,
    c.certified_at,
    c.certificate_url
  FROM certifications c
  JOIN users u ON c.artist_id = u.id
  JOIN artist_profiles ap ON ap.user_id = u.id
  LEFT JOIN tracks t ON c.track_id = t.id
  LEFT JOIN releases r ON c.release_id = r.id
  WHERE c.is_public = TRUE
  ORDER BY c.certified_at DESC;

-- ============================================================
--  EVENTS & TICKETING
-- ============================================================

CREATE TABLE events (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id        UUID NOT NULL REFERENCES users(id),
  title               VARCHAR(255) NOT NULL,
  description         TEXT,
  event_type          event_type DEFAULT 'concert',
  venue_name          VARCHAR(255),
  venue_address       TEXT,
  city                VARCHAR(100),
  country             VARCHAR(80),
  starts_at           TIMESTAMPTZ NOT NULL,
  ends_at             TIMESTAMPTZ,
  cover_image_url     TEXT,
  is_live_streamed    BOOLEAN DEFAULT FALSE,
  stream_url          TEXT,
  status              VARCHAR(20) DEFAULT 'upcoming',  -- upcoming, live, past, cancelled
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ticket_tiers (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id            UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name                VARCHAR(100) NOT NULL,  -- 'General', 'VIP', 'VVIP'
  description         TEXT,
  price_xaf           INTEGER NOT NULL,
  price_cad           NUMERIC(8,2),
  quantity_total      INTEGER NOT NULL,
  quantity_sold       INTEGER DEFAULT 0,
  sale_starts_at      TIMESTAMPTZ,
  sale_ends_at        TIMESTAMPTZ
);

CREATE TABLE tickets (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_id             UUID NOT NULL REFERENCES ticket_tiers(id),
  event_id            UUID NOT NULL REFERENCES events(id),
  buyer_id            UUID NOT NULL REFERENCES users(id),
  order_id            UUID REFERENCES orders(id),
  qr_code             TEXT UNIQUE,            -- unique QR for entry validation
  is_used             BOOLEAN DEFAULT FALSE,
  used_at             TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
--  CAMAS AWARDS
-- ============================================================

CREATE TABLE award_ceremonies (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year                SMALLINT UNIQUE NOT NULL,
  name                VARCHAR(150) NOT NULL,   -- 'CAMAS 2025'
  event_id            UUID REFERENCES events(id),
  voting_opens        TIMESTAMPTZ,
  voting_closes       TIMESTAMPTZ,
  ceremony_date       DATE,
  venue               VARCHAR(255),
  city                VARCHAR(100),
  is_active           BOOLEAN DEFAULT FALSE,   -- only one active at a time
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE award_nominations (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ceremony_id         UUID NOT NULL REFERENCES award_ceremonies(id),
  category            award_category NOT NULL,
  artist_id           UUID REFERENCES users(id),
  track_id            UUID REFERENCES tracks(id),
  release_id          UUID REFERENCES releases(id),
  vote_count          BIGINT DEFAULT 0,
  is_winner           BOOLEAN DEFAULT FALSE,
  announced_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (ceremony_id, category, artist_id)
);

CREATE TABLE award_votes (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ceremony_id         UUID NOT NULL REFERENCES award_ceremonies(id),
  nomination_id       UUID NOT NULL REFERENCES award_nominations(id),
  voter_id            UUID NOT NULL REFERENCES users(id),
  category            award_category NOT NULL,
  voted_at            TIMESTAMPTZ DEFAULT NOW(),
  -- Each user gets limited votes per category based on subscription
  UNIQUE (ceremony_id, voter_id, category)   -- one vote per category per ceremony
);

-- ============================================================
--  PLAYLISTS
-- ============================================================

CREATE TABLE playlists (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title               VARCHAR(255) NOT NULL,
  description         TEXT,
  cover_url           TEXT,
  is_public           BOOLEAN DEFAULT TRUE,
  is_editorial        BOOLEAN DEFAULT FALSE,  -- curated by NKUMU team
  follower_count      INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE playlist_tracks (
  playlist_id         UUID REFERENCES playlists(id) ON DELETE CASCADE,
  track_id            UUID REFERENCES tracks(id) ON DELETE CASCADE,
  added_by            UUID REFERENCES users(id),
  position            INTEGER NOT NULL,
  added_at            TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (playlist_id, track_id)
);

-- ============================================================
--  NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type                VARCHAR(60) NOT NULL,   -- 'new_release', 'certification', 'camas_vote', 'purchase', 'follow'
  title               VARCHAR(200),
  body                TEXT,
  data                JSONB,                  -- flexible payload
  is_read             BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
--  ANALYTICS (Aggregated)
-- ============================================================

CREATE TABLE artist_daily_stats (
  artist_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  date                DATE NOT NULL,
  streams             BIGINT DEFAULT 0,
  unique_listeners    INTEGER DEFAULT 0,
  new_followers       INTEGER DEFAULT 0,
  revenue_xaf         INTEGER DEFAULT 0,
  revenue_cad         NUMERIC(10,2) DEFAULT 0,
  PRIMARY KEY (artist_id, date)
);

-- ============================================================
--  PLATFORM REVENUE SPLITS
-- ============================================================

CREATE TABLE revenue_splits (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id            UUID REFERENCES orders(id),
  total_amount_xaf    INTEGER,
  artist_share_pct    NUMERIC(5,2) DEFAULT 80.00,
  platform_share_pct  NUMERIC(5,2) DEFAULT 20.00,
  artist_amount_xaf   INTEGER,
  platform_amount_xaf INTEGER,
  label_amount_xaf    INTEGER DEFAULT 0,  -- if artist is on a label
  processed_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
--  INDEXES
-- ============================================================

-- Users
CREATE INDEX idx_users_email          ON users(email);
CREATE INDEX idx_users_username       ON users(username);
CREATE INDEX idx_users_role           ON users(role);
CREATE INDEX idx_users_subscription   ON users(subscription_plan);

-- Releases & Tracks
CREATE INDEX idx_releases_artist      ON releases(artist_id);
CREATE INDEX idx_releases_status      ON releases(status);
CREATE INDEX idx_releases_genre       ON releases(genre);
CREATE INDEX idx_releases_date        ON releases(release_date DESC);
CREATE INDEX idx_tracks_release       ON tracks(release_id);
CREATE INDEX idx_tracks_artist        ON tracks(artist_id);
CREATE INDEX idx_tracks_streams       ON tracks(total_streams DESC);
CREATE INDEX idx_tracks_cert          ON tracks(certification);

-- Full-text search
CREATE INDEX idx_releases_title_trgm  ON releases USING gin(title gin_trgm_ops);
CREATE INDEX idx_tracks_title_trgm    ON tracks USING gin(title gin_trgm_ops);
CREATE INDEX idx_artist_stage_trgm    ON artist_profiles USING gin(stage_name gin_trgm_ops);

-- Streams
CREATE INDEX idx_streams_track        ON stream_events(track_id);
CREATE INDEX idx_streams_user         ON stream_events(user_id);
CREATE INDEX idx_streams_date         ON stream_events(streamed_at DESC);
CREATE INDEX idx_streams_counted      ON stream_events(counted) WHERE counted = TRUE;

-- Certifications
CREATE INDEX idx_cert_artist          ON certifications(artist_id);
CREATE INDEX idx_cert_level           ON certifications(level);
CREATE INDEX idx_cert_date            ON certifications(certified_at DESC);
CREATE INDEX idx_cert_reference       ON certifications(camuca_reference);

-- Orders
CREATE INDEX idx_orders_user          ON orders(user_id);
CREATE INDEX idx_orders_status        ON orders(payment_status);
CREATE INDEX idx_orders_date          ON orders(created_at DESC);

-- Awards
CREATE INDEX idx_nominations_ceremony ON award_nominations(ceremony_id);
CREATE INDEX idx_nominations_category ON award_nominations(category);
CREATE INDEX idx_votes_voter          ON award_votes(voter_id);

-- ============================================================
--  FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER releases_updated_at
  BEFORE UPDATE ON releases
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER tracks_updated_at
  BEFORE UPDATE ON tracks
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Increment stream count when a stream event is counted
CREATE OR REPLACE FUNCTION increment_stream_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.counted = TRUE AND (OLD.counted = FALSE OR OLD.counted IS NULL) THEN
    UPDATE tracks
      SET total_streams = total_streams + 1
      WHERE id = NEW.track_id;

    UPDATE releases r
      SET total_streams = total_streams + 1
      FROM tracks t
      WHERE t.id = NEW.track_id AND r.id = t.release_id;

    UPDATE artist_profiles ap
      SET total_streams = total_streams + 1
      FROM tracks t
      WHERE t.id = NEW.track_id AND ap.user_id = t.artist_id;

    -- Update daily totals
    INSERT INTO stream_daily_totals (track_id, date, stream_count)
      VALUES (NEW.track_id, DATE(NEW.streamed_at), 1)
      ON CONFLICT (track_id, date)
      DO UPDATE SET stream_count = stream_daily_totals.stream_count + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_stream_counted
  AFTER UPDATE ON stream_events
  FOR EACH ROW EXECUTE FUNCTION increment_stream_counts();

-- Auto-award CAMUCA certification when thresholds are crossed
CREATE OR REPLACE FUNCTION check_and_award_certification()
RETURNS TRIGGER AS $$
DECLARE
  new_cert cert_level;
  current_cert cert_level;
  ref_num VARCHAR(50);
BEGIN
  -- Determine new certification level
  new_cert := CASE
    WHEN NEW.total_streams >= 1000000 THEN 'diamond'::cert_level
    WHEN NEW.total_streams >= 500000  THEN 'platinum'::cert_level
    WHEN NEW.total_streams >= 100000  THEN 'gold'::cert_level
    WHEN NEW.total_streams >= 50000   THEN 'silver'::cert_level
    WHEN NEW.total_streams >= 10000   THEN 'bronze'::cert_level
    ELSE NULL
  END;

  current_cert := OLD.certification;

  -- Only award if a higher level is reached and not already certified at this level
  IF new_cert IS NOT NULL AND (current_cert IS NULL OR new_cert != current_cert) THEN
    -- Generate CAMUCA reference number
    ref_num := 'CAMUCA-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' ||
               UPPER(LEFT(new_cert::TEXT, 2)) || '-' ||
               LPAD(NEXTVAL('camuca_cert_seq')::TEXT, 4, '0');

    UPDATE tracks SET certification = new_cert, certified_at = NOW() WHERE id = NEW.id;

    INSERT INTO certifications (
      artist_id, track_id, level, stream_count_at_cert, camuca_reference
    ) VALUES (
      NEW.artist_id, NEW.id, new_cert, NEW.total_streams, ref_num
    ) ON CONFLICT DO NOTHING;

    -- Notify the artist
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      NEW.artist_id,
      'certification',
      '🏆 CAMUCA Certification Awarded!',
      'Your track "' || NEW.title || '" has been certified ' || INITCAP(new_cert::TEXT) || ' by CAMUCA.',
      jsonb_build_object('cert_level', new_cert, 'track_id', NEW.id, 'reference', ref_num)
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sequence for CAMUCA reference numbers
CREATE SEQUENCE camuca_cert_seq START 1;

CREATE TRIGGER on_track_stream_update
  AFTER UPDATE OF total_streams ON tracks
  FOR EACH ROW EXECUTE FUNCTION check_and_award_certification();

-- ============================================================
--  SEED DATA (Example / Demo)
-- ============================================================

-- Insert demo artist accounts
INSERT INTO users (id, email, display_name, username, role, subscription_plan, location_country, location_city)
VALUES
  ('a0000001-0000-0000-0000-000000000001', 'parfait@example.cm', 'Parfait Mbongo', 'parfait_mbongo', 'artist', 'artist_pro', 'Cameroon', 'Douala'),
  ('a0000001-0000-0000-0000-000000000002', 'grace@example.cm', 'Grace Eyenga', 'grace_eyenga', 'artist', 'artist_pro', 'Cameroon', 'Yaoundé'),
  ('a0000001-0000-0000-0000-000000000003', 'djkamer@example.cm', 'DJ Kamer', 'dj_kamer', 'artist', 'artist_pro', 'Cameroon', 'Yaoundé'),
  ('a0000001-0000-0000-0000-000000000004', 'sylvie@example.cm', 'Sylvie Bikutsi', 'sylvie_bikutsi', 'artist', 'artist_pro', 'Cameroon', 'Bafia'),
  ('a0000001-0000-0000-0000-000000000005', 'mcdouala@example.cm', 'MC Douala', 'mc_douala', 'artist', 'artist_pro', 'Cameroon', 'Douala');

INSERT INTO artist_profiles (user_id, stage_name, genres, is_verified, total_streams)
VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Parfait Mbongo', ARRAY['makossa']::genre[], TRUE, 1200000),
  ('a0000001-0000-0000-0000-000000000002', 'Grace Eyenga', ARRAY['gospel']::genre[], TRUE, 800000),
  ('a0000001-0000-0000-0000-000000000003', 'DJ Kamer', ARRAY['afrobeat']::genre[], TRUE, 600000),
  ('a0000001-0000-0000-0000-000000000004', 'Sylvie Bikutsi', ARRAY['bikutsi']::genre[], FALSE, 450000),
  ('a0000001-0000-0000-0000-000000000005', 'MC Douala', ARRAY['hiphop_cm']::genre[], FALSE, 220000);

-- CAMAS 2025 Ceremony
INSERT INTO award_ceremonies (id, year, name, voting_opens, voting_closes, ceremony_date, venue, city, is_active)
VALUES (
  'c0000001-0000-0000-0000-000000000001',
  2025, 'CAMAS 2025',
  '2025-12-01 00:00:00+00',
  '2025-12-13 23:59:59+00',
  '2025-12-15',
  'Palais des Congrès',
  'Yaoundé',
  TRUE
);
