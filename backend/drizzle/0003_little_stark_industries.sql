CREATE TABLE "submissions" (
	"submissionId" varchar PRIMARY KEY NOT NULL,
	"quizId" varchar NOT NULL,
	"questionId" varchar NOT NULL,
	"option" varchar NOT NULL,
	"isCorrect" boolean NOT NULL
);
--> statement-breakpoint
CREATE INDEX "submissions_quiz_id_index" ON "submissions" USING btree ("quizId");