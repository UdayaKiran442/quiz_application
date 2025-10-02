/**
 * @author Udaya Kiran Gonuguntla
 * @description database operations for questions table
 */

import { eq } from "drizzle-orm";
import { AddQuestionsToQuizInDBError, GetQuestionByQuizIdFromDBError } from "../exceptions/questions.exceptions";
import { IAddQuestionsToQuizSchema } from "../routes/v1/questions.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { questions, quiz } from "./schema";

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

export async function getQuestionsByQuizIdFromDB(quizId: string){
    try {
        return await db.select({
            questionId: questions.questionId,
            quizId: questions.quizId,
            title: quiz.title,
            questionText: questions.questionText,
            options: questions.options,
        }).from(questions).where(eq(questions.quizId, quizId)).leftJoin(quiz, eq(questions.quizId, quiz.quizId));
    } catch (error) {
        throw new GetQuestionByQuizIdFromDBError("Failed to get quiz by id from DB", { cause: (error as Error).message });
    }
}