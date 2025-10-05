import { eq } from "drizzle-orm";
import { AddAttemptToDBError, UpdateAttemptStatusInDBError } from "../exceptions/attempts.exceptions";
import { IAddAttemptSchema } from "../routes/v1/attempts.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { attempts } from "./schema";

export async function addAttemptToDB(payload: IAddAttemptSchema){
    try {
        const insertPayload = {
            attemptId: `attempt_${generateNanoId()}`,
            quizId: payload.quizId,
            startedAt: new Date(),
        }
        await db.insert(attempts).values(insertPayload);
        return insertPayload.attemptId;
    } catch (error) {
        throw new AddAttemptToDBError("Unable to add attempt to db", { cause: (error as Error).message });
    }
}

export async function updateAttemptStatusInDB(attemptId: string){
    try {
        await db.update(attempts).set({status: "COMPLETED", endedAt: new Date()}).where(eq(attempts.attemptId, attemptId));
    } catch (error) {
        throw new UpdateAttemptStatusInDBError("Unable to update attempt status in db", { cause: (error as Error).message });
    }
}