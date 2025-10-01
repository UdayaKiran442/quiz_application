import { AddQuestionsToQuizError, AddQuestionsToQuizInDBError } from "../exceptions/questions.exceptions";
import { addQuestionsToQuizInDB } from "../repository/questions.repository";
import { IAddQuestionsToQuizSchema } from "../routes/v1/questions.route";

export async function addQuestionsToQuiz(payload: IAddQuestionsToQuizSchema){
    try {
        return await addQuestionsToQuizInDB(payload);
    } catch (error) {
        if(error instanceof AddQuestionsToQuizInDBError){
            throw error;
        }
        throw new AddQuestionsToQuizError("Failed to add questions to quiz", { cause: (error as Error).message });
    }
}