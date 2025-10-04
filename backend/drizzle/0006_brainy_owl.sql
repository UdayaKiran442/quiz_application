ALTER TABLE "submissions" ADD CONSTRAINT "submissions_questionId_attemptId_pk" PRIMARY KEY("questionId","attemptId");--> statement-breakpoint
ALTER TABLE "submissions" DROP COLUMN "submissionId";