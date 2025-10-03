import { SubmitQuestionError, SubmitQuestionInDBError } from "../exceptions/submit.exceptions";
import { submitQuestionInDB } from "../repository/submit.repository";
import { ISubmitQuestionSchema } from "../routes/v1/submit.route";

export async function submitQuestion(payload: ISubmitQuestionSchema){
    try {
        return await submitQuestionInDB(payload);
    } catch (error) {
        if(error instanceof SubmitQuestionInDBError) {
            throw error;
        }
        throw new SubmitQuestionError("Failed to submit question", { cause: (error as Error).message });
    }
}