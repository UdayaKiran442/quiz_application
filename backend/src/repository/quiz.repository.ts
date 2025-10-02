/**
 * @author Udaya Kiran Gonuguntla
 * @description database operations for quiz table
 */

import { CreateQuizInDBError, GetQuizzesFromDBError } from "../exceptions/quiz.exceptions";
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
            noOfQuestions: payload.noOfQuestions,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await db.insert(quiz).values(insertPayload);
        return insertPayload.quizId;
    } catch (error) {
        throw new CreateQuizInDBError("Failed to create quiz in DB", { cause: (error as Error).message });
    }
}

export async function getQuizzesFromDB(){
    try {
        return await db.select().from(quiz);
    } catch (error) {
        throw new GetQuizzesFromDBError("Failed to get quizzes from DB", { cause: (error as Error).message });
    }
}