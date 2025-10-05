# Quiz Application - System Design Document

**Author** Udaya Kiran Gonuguntla
**Date** 5 Oct 2025

- This document describes production ready design for quiz application.
- It covers schema, API's, run time flow, scaling, security etc.

## 1. Goals and Requirements

### Functional requirements
- Create quizzes (title, duration, questions/options, correctOption).
- Start quiz.
- Choose option for each question.
- Submit quiz.
- Detailed report of quiz will be shown in reports page.

### Non-Functional requirements
- Reasonable scale (thousands of quizzes / tens of thousands of attempts).
- Easy to extend (add auth later, partial scoring, multiple question types).

## 2. Technology Stack

### Backend
- Runtime Environment: Bun - chosen for its speed, light weight runtime.
- Routing: HonoJS - Web application high-performance framework for Bun/Deno/Cloudflare workers that simplifies route handling, request validation.
- Database: PostgreSQL - SQL database for storing quiz/questions/submissions/reports data.
- Database hosting: Neon - serverless postgres provider with branching, auto-scaling.
- ORM/Query Builder: Drizzle ORM - type-safe schema definitions, migrations and SQL query building.

### Frontend
- Library: Next.js 15(App Router) - Modern react library with sever component, dynamic rendering and file based routing.
- Styling: Tailwind CSS.

## 3. Data Model

### Quiz
```sh
quiz_id: string,
title: string,
no_of_questions: number,
duration: number,
created_at: Date,
updated_at: Date
```

### Questions
```sh
question_id: string,
quiz_id: string,
question_text: string,
options: json,
correct_option: string,
created_at: string,
updated_at: string
```

### Attempts
```sh
attempt_id: string,
quiz_id: string,
status: string,
started_at: Date,
ended_at: Date
```

### Submissions
```sh
quizId: string,
questionId: string,
attemptId: string,
option: string,
isCorrect: boolean,
created_at: Date,
updated_at: Date
```

### Reports
```sh
report_id: string,
quiz_id: string,
attempt_id: string,
score: integer,
attempted_questions: integer,
un_attempted_questions: integer,
created_at: Date,
updated_at: Date
```

## 4. Technical Flow
- Frontend Create Quiz -> Backend API will be called, payload will be validated in both frontend and backend and new quiz will be created and added in database.
- Frontend Take Quiz -> Backend API will be called for creating a new attempt in attempts table, after which first question will be rendered for the users.
- Frontend Next Question -> When user selects next question after selecting an answer, user will be navigated to next question and in background submission will be added in submissions table after validating user chosen option if it is correct or not.
- Frontend Submit Quiz -> After attempting all questions users can submit quiz, score will be calculated and user will be navigated to reports page where users can see detailed report of the quiz.

## 5. API Design
Base URL: "http://localhost:8080/v1"

### 5.1 Quiz Route

**Create Quiz**

API End Point: /quiz/create

Method: POST

Description: API to create quiz. Created quiz will be stored in database.

Payload: 
```js
{
  title: string,
  duration: number, // duration in minutes
  noOfQuestions: number
}
```

Response: 
```js
{
  success: boolean,
  message: string,
  quizId: string
}
```

**Fetch All Quizzes**

API End Point: /quiz

Method: GET

Description: API to fetch all quizzes from database.

Response:
```js
{
  success: boolean,
  quiz: {
    quizId: string,
    title: string,
    noOfQuestions: number,
    duration: number,
    createdAt: Date,
    updatedAt: Date
  }[]
}
```

### 5.2 Questions Route
 
**Add Question to Quiz Schema**

API End Point: /question/add

Method: POST

Description: API to add question to quiz.

Payload:
```js
{
  quizId: string,
  questionText: string,
  options: Record<string,string>,
  correctOption: string
}
```

Response
```js
{
success: boolean,
message: string
}
```

**Fetch questions by quiz id**

API End Point: /question/fetch

Method: POST

Description: API to fetch all questions for the quiz which are rendered in quiz page.

Payload: 
```js
{
  quizId: string
}
```

Response:
```js
{
  success: boolean,
  questions: {
    quizId: string,
    title: string,
    duration: string,
    questionId: string,
    questionText: string,
    options: Record<string, string>,
  }[]
}
```

### 5.3 Attempts Router

**Add Attempt**

API End Point: /attempts/add

Method: POST

Description: Add attempt when user starts the quiz, this attempt id which will be generated helps to uniquely identify submission which later can be used for scoring.

Payload:
```js
{
  quizId: string
}
```

Response:
```js
{
  success: boolean,
  message: string,
  attemptId: string
}
```

### 5.4 Submit Router

**Submit Question**

API End Point: /submit/question

Method: POST

Description: API is used to add a submission in database when user answers a question.

Payload: 
```js
{
  quizId: string,
  questionId: string,
  attemptId: string,
  option: string
}
```

Response:
```js
{
  success: boolean,
  message: string,
}
```

**Submit Quiz**

API End Point: /submit/quiz

Method: POST

Description: API used to submit quiz, report of the quiz inlcuding score, no of correct etc will be stored in reports table.

Payload: 
```js
{
  quizId: string,
  attemptId: string,
}
```

Response:
```js
{
  success: boolean,
  message: string,
  reportId: string
}
```
### 5.5 Reports Router

**Fetch Report**

API End Point: /report/fetch

Method: POST

Description: This API will be called to fetch the report for the quiz.

Payload: 
```js
{
  reportId: string,
}
```

Response:
```js
{
  success: boolean,
  message: string,
  report: {
    reportId: string,
    quizId: string,
    attemptId: string,
    score: number,
    attemptedQuestions: number,
    unAttemptedQuestions: number,
    createdAt: Date,
    submissions: ISubmissions[]
  }
}

interface ISubmissions {
    quizId: string,
    questionId: string,
    option: string,
    isCorrect: string,
    created_at: Date,
    updated_at: Date,
    attemptId: string
}
```

## 6. UX Considerations
- Start quiz: create attempt first, then render first question and start timer using duration.
- Save progress locally (for retries) and call submissions API in the background or on navigation.
- On timer expired: auto-call submit; show “Submitting…” and show report on success.
- Show review screen with: question text, chosen option, correct option, whether correct.
