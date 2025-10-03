CREATE TABLE "attempts" (
	"attempt_id" varchar PRIMARY KEY NOT NULL,
	"quiz_id" varchar NOT NULL,
	"status" varchar DEFAULT 'IN_PROGRESS' NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "attemptId" varchar NOT NULL;