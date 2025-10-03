import { SubmitQuestionInDBError } from "../exceptions/submit.exceptions";
import { ISubmitQuestionSchema } from "../routes/v1/submit.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { submissions } from "./schema";

export async function submitQuestionInDB(payload: ISubmitQuestionSchema) {
    try {
        const insertPayload = {
            submissionId: `submit_${generateNanoId()}`,
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await db.insert(submissions).values(insertPayload);
    } catch (error) {
        throw new SubmitQuestionInDBError("Failed to submit question in DB", { cause: (error as Error).message });
    }
}