/**
 * @author Udaya Kiran Gonuguntla
 * @description drizzle orm schemas for quiz and questions tables
 */

import { integer, pgTable, timestamp, varchar, json, index, boolean, primaryKey } from "drizzle-orm/pg-core";

export const quiz = pgTable("quiz", {
    quizId: varchar("quiz_id").primaryKey(),
    title: varchar("title").notNull(),
    noOfQuestions: integer("no_of_questions").notNull(),
    duration: integer("duration").notNull(), // in minutes
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
})

export const questions = pgTable("questions", {
    questionId: varchar("question_id").primaryKey(),
    quizId: varchar("quiz_id").notNull(),
    questionText: varchar("question_text").notNull(),
    options: json("options").notNull(),
    correctOption: varchar("correct_option").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
}, (questions) => ({
    quizIdIndex: index("quiz_id_index").on(questions.quizId)
}))

export const attempts = pgTable("attempts", {
    attemptId: varchar("attempt_id").primaryKey(),
    quizId: varchar("quiz_id").notNull(),
    status: varchar("status").notNull().default("IN_PROGRESS"), // in progress, completed
    startedAt: timestamp("started_at").notNull(),
    endedAt: timestamp("ended_at"),
})

export const submissions = pgTable("submissions", {
    quizId: varchar("quizId").notNull(),
    questionId: varchar("questionId").notNull(),
    attemptId: varchar("attemptId").notNull(),
    option: varchar("option").notNull(),
    isCorrect: boolean("isCorrect").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
}, (submissions) => [
    index("submissions_quiz_id_index").on(submissions.quizId),
    primaryKey({ columns: [submissions.questionId, submissions.attemptId] }), // composite primary key to find unique values by questionId and attemptId
])

export const reports = pgTable("reports", {
    reportId: varchar("report_id").primaryKey(),
    quizId: varchar("quiz_id").notNull(),
    attemptId: varchar("attempt_id").notNull(),
    score: integer("score").notNull(),
    attemptedQuestions: integer("attempted_questions").notNull(),
    unAttemptedQuestions: integer("un_attempted_questions").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
})