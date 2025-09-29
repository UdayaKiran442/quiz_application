import { Hono } from "hono";
import quizRouter from "./quiz.route";

const v1Router = new Hono();

v1Router.route('/quiz', quizRouter);

export default v1Router;