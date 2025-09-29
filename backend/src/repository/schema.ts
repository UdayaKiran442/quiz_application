import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const quiz = pgTable("quiz", {
    quizId: varchar("quiz_id").primaryKey(),
    title: varchar("title").notNull(),
    noOfQuestions: integer("no_of_questions").notNull().default(0),
    duration: integer("duration").notNull(), // in minutes
})