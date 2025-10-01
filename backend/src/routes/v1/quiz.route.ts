import { Hono } from "hono";
import z, { success } from "zod";
import { createQuiz, getQuizzes } from "../../controller/quiz.controller";
import { CreateQuizError, CreateQuizInDBError, GetQuizzesError, GetQuizzesFromDBError } from "../../exceptions/quiz.exceptions";

const quizRouter = new Hono();

const CreateQuizSchema = z.object({
    title: z.string().min(1, "Title is required"),
    duration: z.number().min(1, "Duration must be at least 1 minute"),
    noOfQuestions: z.number().min(1, "Number of questions must be at least 1"),
})

export type ICreateQuizSchema = z.infer<typeof CreateQuizSchema>;

quizRouter.post('/create', async (c) => {
    try {
        const validation = CreateQuizSchema.safeParse(await c.req.json());
        if (!validation.success) {
            throw validation.error;
        }
        const quizId = await createQuiz(validation.data);
        console.log("🚀 ~ quizId:", quizId)
        return c.json({success: true, message: 'Quiz created successfully', quizId }, 200);
    } catch (error) {
        if(error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
        }
        
        if(error instanceof CreateQuizInDBError || error instanceof CreateQuizError){
            return c.json({ success: false, message: error.message, error: error.cause }, 500);
        }

		return c.json({ success: false, message: "Something went wrong" }, 500);
    }
});

quizRouter.get('/', async(c) => {
    try {
        const quiz = await getQuizzes();
        return c.json({ success: true, quiz }, 200);
    } catch (error) {
        if (error instanceof GetQuizzesError || error instanceof GetQuizzesFromDBError) {
            return c.json({ success: false, message: error.message, error: error.cause }, 500);
        }
        return c.json({ success: false, message: "Something went wrong" }, 500);
    }
})

export default quizRouter;