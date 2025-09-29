import { createQuizInDB } from "../repository/quiz.repository";
import { ICreateQuizSchema } from "../routes/v1/quiz.route";

export async function createQuiz(payload: ICreateQuizSchema) {
    try {
        return await createQuizInDB(payload);
    } catch (error) {
        
    }
}