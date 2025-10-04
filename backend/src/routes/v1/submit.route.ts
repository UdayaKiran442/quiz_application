import { Hono } from "hono";
import z from "zod";
import { fetchCorrectOptionByQuestionId } from "../../repository/questions.repository";
import { submitQuestion, submitQuiz } from "../../controller/submit.controller";
import { FetchSubmissionsByAttemptIdFromDBError, SubmitQuestionError, SubmitQuestionInDBError, SubmitQuizError } from "../../exceptions/submit.exceptions";
import { FetchCorrectOptionByQuestionIdError } from "../../exceptions/questions.exceptions";
import { GetQuizByIdFromDBError } from "../../exceptions/quiz.exceptions";
import { AddReportToDBError } from "../../exceptions/reports.exceptions";

const submitRoute = new Hono();

const SubmitQuestionSchema = z.object({
    quizId: z.string(),
    questionId: z.string(),
    attemptId: z.string(),
    option: z.string().min(1).max(1),
})

export type ISubmitQuestionSchema = z.infer<typeof SubmitQuestionSchema> & { isCorrect: boolean }

submitRoute.post('/question', async(c) => {
    try {
        const validation = SubmitQuestionSchema.safeParse(await c.req.json());
        if(!validation.success){
            throw validation.error;
        }
        
        const {correctOption} = await fetchCorrectOptionByQuestionId(validation.data.questionId);
        const payload = {
            ...validation.data,
            isCorrect: correctOption === validation.data.option
        }
        await submitQuestion(payload);
        return c.json({success: true, message: "Question submitted successfully" }, 200);
   } catch (error) {
        if(error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
            return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
        }
        if(error instanceof SubmitQuestionError || error instanceof SubmitQuestionInDBError || error instanceof FetchCorrectOptionByQuestionIdError){
            return c.json({ message: error.message, error: error.cause }, 500);
        }
        return c.json({ message: "Failed to submit question", error: (error as Error).message }, 500);
    }
})

const SubmitQuizSchema = z.object({
    quizId: z.string(),
    attemptId: z.string(),
})

export type ISubmitQuizSchema = z.infer<typeof SubmitQuizSchema>

submitRoute.post('/quiz', async (c) => {
    try {
        const validation = SubmitQuizSchema.safeParse(await c.req.json());
        if(!validation.success){
            throw validation.error;
        }
        const reportId = await submitQuiz(validation.data);
        return c.json({ success: true, message: "Quiz submitted successfully", reportId }, 200);
    } catch (error) {
        if(error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
            return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
        }
        if (error instanceof AddReportToDBError || error instanceof FetchSubmissionsByAttemptIdFromDBError || error instanceof GetQuizByIdFromDBError || error instanceof SubmitQuizError) {
            throw error;
        }

        return c.json({ message: "Failed to submit quiz", error: (error as Error).message }, 500);
    }
})

export default submitRoute;