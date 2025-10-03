"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "./ui/Button";
import { IQuiz } from "@/types/types";
import QuizCard from "./QuizCard";
import { addAttemptAPI } from "@/actions/attempts.actions";
import { useState } from "react";

interface IQuizzesPage {
  quizzes: IQuiz[]
}

export default function QuizzesPage({ quizzes }: IQuizzesPage) {
  const [loading, setLoading] = useState(false);

  const redirect = useRouter();

  async function createAttempt(quizId: string) {
    try {
      setLoading(true);
      const newAttempt = await addAttemptAPI(quizId);
      if (newAttempt.success) {
        setLoading(false);
        // redirect to quiz exam page
        redirect.push(`/quiz/${quizId}/${newAttempt.attemptId}`);
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
        <QuizCard loading={loading} onClick={() => createAttempt(quiz.quizId)} quiz={quiz} key={quiz.quizId} />
      ))}
    </div>
  );
};
