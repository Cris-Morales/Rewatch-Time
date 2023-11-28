
CREATE TABLE "arcs" (
  "arc_id" SERIAL PRIMARY KEY NOT NULL,
  "arc" varchar(255) NOT NULL
);


CREATE TABLE "series" (
  "series_id" SERIAL PRIMARY KEY NOT NULL,
  "series_name" varchar NOT NULL
);

CREATE TABLE "seasons" (
  "season_id" SERIAL PRIMARY KEY NOT NULL,
  "season_number" integer NOT NULL
);

CREATE TABLE "episodes" (
  "episode_id" SERIAL PRIMARY KEY NOT NULL,
  "episode_number" integer NOT NULL,
  "title" varchar(255) NOT NULL,
  "synopsis" text NOT NULL,
  "airdate" date NOT NULL,
  "season_id" integer NOT NULL REFERENCES seasons(season_id),
  "season_episode" integer NOT NULL
);

CREATE TABLE "episodes_arcs" (
  "episodes_arcs_id" SERIAL PRIMARY KEY NOT NULL,
  "episode_id" integer NOT NULL REFERENCES episodes(episode_id),
  "arc_id" integer NOT NULL REFERENCES arcs(arc_id)
);

CREATE TABLE "season_series" (
  "seasons_series_id" SERIAL PRIMARY KEY NOT NULL,
  "series_id" integer NOT NULL REFERENCES series(series_id),
  "season_id" integer NOT NULL REFERENCES seasons(season_id)
);