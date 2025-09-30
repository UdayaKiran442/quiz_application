import { Hono } from "hono";
import z, { success } from "zod";
import { createQuiz } from "../../controller/quiz.controller";
import { CreateQuizError, CreateQuizInDBError } from "../../exceptions/quiz.exceptions";

const quizRouter = new Hono();

const CreateQuizSchema = z.object({
    title: z.string().min(1, "Title is required"),
    duration: z.number().min(1, "Duration must be at least 1 minute"),
})

export type ICreateQuizSchema = z.infer<typeof CreateQuizSchema>;

quizRouter.post('/create', async (c) => {
    try {
        const validation = CreateQuizSchema.safeParse(await c.req.json());
        if (!validation.success) {
            throw validation.error;
        }
        await createQuiz(validation.data);
        return c.json({success: true, message: 'Quiz created successfully' }, 200);
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

export default quizRouter;