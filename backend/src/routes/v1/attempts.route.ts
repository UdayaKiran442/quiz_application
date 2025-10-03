import { Hono } from "hono";
import z from "zod";
import { addAttempt } from "../../controller/attempts.controller";
import { AddAttemptError, AddAttemptToDBError } from "../../exceptions/attempts.exceptions";

const attemptsRouter = new Hono();

const AddAttemptSchema = z.object({
    quizId: z.string(),
})

export type IAddAttemptSchema = z.infer<typeof AddAttemptSchema>;

attemptsRouter.post('/add', async (c) => {
    try {
        const validation = AddAttemptSchema.safeParse(await c.req.json());
        if(!validation.success){
            throw validation.error;
        }
        const attempt = await addAttempt(validation.data);
        return c.json({ message: "Attempt added successfully", attemptId: attempt }, 200);
    } catch (error) {
        if(error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
            return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
        }
        if(error instanceof AddAttemptError || error instanceof AddAttemptToDBError){
            return c.json({ message: error.message, error: error.cause }, 500);
        }
        return c.json({ message: "Failed to add attempt", error: (error as Error).message }, 500);
    }
})

export default attemptsRouter;