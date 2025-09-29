CREATE TABLE "quiz" (
	"quiz_id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"no_of_questions" integer DEFAULT 0 NOT NULL,
	"duration" integer NOT NULL
);
