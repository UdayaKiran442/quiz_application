import { AddQuestionsToQuizInDBError } from "../exceptions/questions.exceptions";
import { IAddQuestionsToQuizSchema } from "../routes/v1/questions.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { questions } from "./schema";

export async function addQuestionsToQuizInDB(payload: IAddQuestionsToQuizSchema){
    try {
        const insertPayload = payload.map((question) => ({
            questionId: `question_${generateNanoId()}`,
            quizId: question.quizId,
            questionText: question.questionText,
            options: question.options,
            correctOption: question.correctOption,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        await db.insert(questions).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new AddQuestionsToQuizInDBError("Failed to add questions to quiz in DB", { cause: (error as Error).message });
    }
}