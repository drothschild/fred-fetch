DROP DATABASE IF EXISTS fred;
CREATE DATABASE fred;

\c fred;

CREATE TABLE observations (
  ID SERIAL PRIMARY KEY,
  observation_date DATE,
  value TEXT,
  series_id TEXT
  );

CREATE TABLE series (
  ID TEXT PRIMARY KEY,
  realtime_start DATE,
  realtime_end DATE,
  title TEXT,
  observation_start DATE,
  observation_end DATE,
  frequency TEXT,
  frequency_short TEXT,
  units  TEXT,
  units_short  TEXT,
  seasonal_adjustment TEXT,
  seasonal_adjustment_short TEXT,
  last_updated TIMESTAMP,
  popularity INTEGER,
  notes TEXT
  );

