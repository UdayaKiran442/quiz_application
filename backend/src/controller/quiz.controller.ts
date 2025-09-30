import { CreateQuizError, CreateQuizInDBError } from "../exceptions/quiz.exceptions";
import { createQuizInDB } from "../repository/quiz.repository";
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