CREATE TABLE "Episodes" (
  "episode_id" SERIAL PRIMARY KEY NOT NULL,
  "episode_number" integer NOT NULL,
  "title" varchar(255) NOT NULL,
  "synopsis" text NOT NULL,
  "airdate" date NOT NULL
);

CREATE TABLE "Arcs" (
  "arc_id" SERIAL PRIMARY KEY NOT NULL,
  "arc" varchar(255) NOT NULL
);

CREATE TABLE "Seasons" (
  "season_id" SERIAL PRIMARY KEY NOT NULL,
  "season" integer NOT NULL,
  "series_id" integer NOT NULL
);

CREATE TABLE "Season_Episodes" (
  "season_episode_id" SERIAL PRIMARY KEY NOT NULL,
  "episode_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "season_episode" integer NOT NULL
);

CREATE TABLE "Episode_Arcs" (
  "episode_id" integer,
  "arc_id" integer
);

CREATE TABLE "Series" (
  "series_id" SERIAL PRIMARY KEY NOT NULL,
  "series_name" varchar NOT NULL
);


CREATE TABLE "Episodes_Season_Episodes" (
  "Episodes_episode_id" SERIAL,
  "Season_Episodes_episode_id" integer,
  PRIMARY KEY ("Episodes_episode_id", "Season_Episodes_episode_id")
);

CREATE TABLE "Episodes_Episode_Arcs" (
  "Episodes_episode_id" SERIAL,
  "Episode_Arcs_episode_id" integer,
  PRIMARY KEY ("Episodes_episode_id", "Episode_Arcs_episode_id")
);

CREATE TABLE "Seasons_Season_Episodes" (
  "Seasons_season_id" SERIAL,
  "Season_Episodes_season_id" integer,
  PRIMARY KEY ("Seasons_season_id", "Season_Episodes_season_id")
);

CREATE TABLE "Arcs_Episode_Arcs" (
  "Arcs_arc_id" SERIAL,
  "Episode_Arcs_arc_id" integer,
  PRIMARY KEY ("Arcs_arc_id", "Episode_Arcs_arc_id")
);

ALTER TABLE "Seasons" ADD FOREIGN KEY ("series_id") REFERENCES "Series" ("series_id");
ALTER TABLE "Episodes_Season_Episodes" ADD FOREIGN KEY ("Episodes_episode_id") REFERENCES "Episodes" ("episode_id");
ALTER TABLE "Episodes_Season_Episodes" ADD FOREIGN KEY ("Season_Episodes_episode_id") REFERENCES "Season_Episodes" ("episode_id");
ALTER TABLE "Seasons_Season_Episodes" ADD FOREIGN KEY ("Seasons_season_id") REFERENCES "Seasons" ("season_id");
ALTER TABLE "Seasons_Season_Episodes" ADD FOREIGN KEY ("Season_Episodes_season_id") REFERENCES "Season_Episodes" ("season_id");
ALTER TABLE "Episodes_Episode_Arcs" ADD FOREIGN KEY ("Episodes_episode_id") REFERENCES "Episodes" ("episode_id");
ALTER TABLE "Episodes_Episode_Arcs" ADD FOREIGN KEY ("Episode_Arcs_episode_id") REFERENCES "Episode_Arcs" ("episode_id");
ALTER TABLE "Arcs_Episode_Arcs" ADD FOREIGN KEY ("Arcs_arc_id") REFERENCES "Arcs" ("arc_id");
ALTER TABLE "Arcs_Episode_Arcs" ADD FOREIGN KEY ("Episode_Arcs_arc_id") REFERENCES "Episode_Arcs" ("arc_id");
