import { ICreateQuizSchema } from "../routes/v1/quiz.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { quiz } from "./schema";

export async function createQuizInDB(payload: ICreateQuizSchema){
    try {
        const insertPayload = {
            quizId: `quiz_${generateNanoId()}`,
            title: payload.title,
            duration: payload.duration,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await db.insert(quiz).values(insertPayload);
        return insertPayload;
    } catch (error) {
    
    }
}