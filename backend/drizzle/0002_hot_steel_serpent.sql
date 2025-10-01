CREATE TABLE "questions" (
	"question_id" varchar PRIMARY KEY NOT NULL,
	"quiz_id" varchar NOT NULL,
	"question_text" varchar NOT NULL,
	"options" json NOT NULL,
	"correct_option" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quiz" ALTER COLUMN "no_of_questions" DROP DEFAULT;--> statement-breakpoint
CREATE INDEX "quiz_id_index" ON "questions" USING btree ("quiz_id");