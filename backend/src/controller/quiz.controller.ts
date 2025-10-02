/**
 * @author Udaya Kiran Gonuguntla
 * @description Controller for quiz route
 */

import { CreateQuizError, CreateQuizInDBError, GetQuizzesError, GetQuizzesFromDBError } from "../exceptions/quiz.exceptions";
import { createQuizInDB, getQuizzesFromDB } from "../repository/quiz.repository";
import { ICreateQuizSchema } from "../routes/v1/quiz.route";

export async function createQuiz(payload: ICreateQuizSchema) {
    try {
        return await createQuizInDB(payload);
    } catch (error) {
        if(error instanceof CreateQuizInDBError){
            throw error;
        }
        throw new CreateQuizError("Failed to create quiz", { cause: (error as Error).message });
    }
}

export async function getQuizzes() {
    try {
        return await getQuizzesFromDB();
    } catch (error) {
        if(error instanceof GetQuizzesFromDBError){
            throw error;
        }
        throw new GetQuizzesError("Failed to get quizzes", { cause: (error as Error).message });
    }
}