import { Hono } from "hono";
import z from "zod";
import { AddQuestionsToQuizError, AddQuestionsToQuizInDBError } from "../../exceptions/questions.exceptions";
import { addQuestionsToQuiz } from "../../controller/questions.controller";

const questionsRouter = new Hono();

const AddQuestionsToQuizSchema = z.array(z.object({
    quizId: z.string(),
    questionText: z.string().min(5, "Question text must be minimum of 5 characters"),
    options: z.record(z.string().min(1, "Option key must be minimum of 1 character"), z.string().min(1, "Option value must be minimum of 1 character")),
    correctOption: z.string().min(1, "Correct option must be minimum of 1 character"),
}));

export type IAddQuestionsToQuizSchema = z.infer<typeof AddQuestionsToQuizSchema>;

questionsRouter.post('/add', async (c) => {
    try {
        const validation = AddQuestionsToQuizSchema.safeParse(await c.req.json());
        console.log("🚀 ~ validation.data:", validation.data)
        if (!validation.success) {
            throw validation.error;
        }
        await addQuestionsToQuiz(validation.data);
        return c.json({ success: true, message: 'Questions added to quiz successfully' }, 200);
    } catch (error) {
        if(error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
            return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
        }
        
        if(error instanceof AddQuestionsToQuizError || error instanceof AddQuestionsToQuizInDBError){
            return c.json({ success: false, message: error.message, error: error.cause }, 500);
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
});

export default questionsRouter;