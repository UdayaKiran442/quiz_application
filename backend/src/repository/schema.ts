/**
 * @author Udaya Kiran Gonuguntla
 * @description drizzle orm schemas for quiz and questions tables
 */

import { integer, pgTable, timestamp, varchar, json, index, boolean } from "drizzle-orm/pg-core";

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

export const submissions = pgTable("submissions", {
    submissionId: varchar("submissionId").primaryKey(),
    quizId: varchar("quizId").notNull(),
    questionId: varchar("questionId").notNull(),
    option: varchar("option").notNull(),
    isCorrect: boolean("isCorrect").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
}, (submissions) => ({
    quizIdIndex: index("submissions_quiz_id_index").on(submissions.quizId),
}))