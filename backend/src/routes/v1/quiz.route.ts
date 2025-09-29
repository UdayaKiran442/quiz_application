import { Hono } from "hono";
import z from "zod";
import { createQuiz } from "../../controller/quiz.controller";

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
        const quiz = await createQuiz(validation.data);
        console.log("🚀 ~ quiz:", quiz)
        return c.json({ message: 'Quiz created successfully', quiz }, 200);
    } catch (error) {
        if(error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
        }
		return c.json({ success: false, message: "Something went wrong" }, 500);
    }
});

export default quizRouter;