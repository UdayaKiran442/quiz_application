CREATE TABLE "reports" (
	"report_id" varchar PRIMARY KEY NOT NULL,
	"quiz_id" varchar NOT NULL,
	"attempt_id" varchar NOT NULL,
	"score" integer NOT NULL,
	"attempted_questions" integer NOT NULL,
	"un_attempted_questions" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
