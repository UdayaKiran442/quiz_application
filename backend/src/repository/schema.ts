import { integer, pgTable, timestamp, varchar, json, index } from "drizzle-orm/pg-core";

export const quiz = pgTable("quiz", {
    quizId: varchar("quiz_id").primaryKey(),
    title: varchar("title").notNull(),
    noOfQuestions: integer("no_of_questions").notNull().default(0),
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

/**
 * {
    "origin": "string",
    "code": "too_small",
    "minimum": 5,
    "inclusive": true,
    "path": [
        0,
        "questionText"
    ],
    "message": "Question text must be minimum of 5 characters"
}

{
    "origin": "string",
    "code": "too_small",
    "minimum": 1,
    "inclusive": true,
    "path": [
        0,
        "options",
        "A"
    ],
    "message": "Option value must be minimum of 1 character"
}
 */