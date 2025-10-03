/**
 * @author Udaya Kiran Gonuguntla
 * @description home page for v1Router, all routes with path name v1 will be re-directed here
 */

import { Hono } from "hono";
import quizRouter from "./quiz.route";
import questionsRouter from "./questions.route";
import submitRoute from "./submit.route";

const v1Router = new Hono();

v1Router.route('/quiz', quizRouter);
v1Router.route('/questions', questionsRouter);
v1Router.route('/submit', submitRoute);

export default v1Router;