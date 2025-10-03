"use client"

import Link from "next/link";

import Button from "./ui/Button";
import { IQuiz } from "@/types/types";
import QuizCard from "./QuizCard";
import { addAttemptAPI } from "@/actions/attempts.actions";

interface IQuizzesPage {
  quizzes: IQuiz[]
}

export default function QuizzesPage({ quizzes }: IQuizzesPage) {

  async function createAttempt(quizId: string) {
    try {
      const newAttemptId = await addAttemptAPI(quizId)
      if (newAttemptId.success) {
        // store attemptId in redux
        // redirect to quiz exam page
      }
    } catch (error) {

    }
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        <Link href={"/create-quiz"}>
          <Button>+ Create New Quiz</Button>
        </Link>
      </div>
      {quizzes.map((quiz) => (
        <QuizCard onClick={() => createAttempt(quiz.quizId)} quiz={quiz} key={quiz.quizId} />
      ))}
    </div>
  );
};
