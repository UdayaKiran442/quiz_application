import { Hono } from "hono";
import quizRouter from "./quiz.route";
import questionsRouter from "./questions.route";

const v1Router = new Hono();

v1Router.route('/quiz', quizRouter);
v1Router.route('/questions', questionsRouter);

export default v1Router;