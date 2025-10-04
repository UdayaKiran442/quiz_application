import { eq } from "drizzle-orm";
import { FetchSubmissionsByAttemptIdFromDBError, SubmitQuestionInDBError } from "../exceptions/submit.exceptions";
import { ISubmitQuestionSchema } from "../routes/v1/submit.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { submissions } from "./schema";

export async function submitQuestionInDB(payload: ISubmitQuestionSchema) {
    try {
        const insertPayload = {
            quizId: payload.quizId,
            questionId: payload.questionId,
            attemptId: payload.attemptId,
            option: payload.option,
            isCorrect: payload.isCorrect,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await db.insert(submissions).values(insertPayload).onConflictDoUpdate({
            target: [submissions.questionId, submissions.attemptId],
            set: {
                option: insertPayload.option,
                isCorrect: insertPayload.isCorrect,
                updatedAt: new Date(),
            }
        });
        return;
    } catch (error) {
        throw new SubmitQuestionInDBError("Failed to submit question in DB", { cause: (error as Error).message });
    }
}

export async function fetchSubmissionsByAttemptIdFromDB(attemptId: string) {
    try {
        return await db.select().from(submissions).where(eq(submissions.attemptId, attemptId));
    } catch (error) {
        throw new FetchSubmissionsByAttemptIdFromDBError("Failed to fetch submissions by attemptId from DB", { cause: (error as Error).message });
    }
}