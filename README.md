# Quiz Application - System Design Document

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
- Routing: 
