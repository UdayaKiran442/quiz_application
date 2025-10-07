"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "./ui/Button";
import { IQuiz } from "@/types/types";
import QuizCard from "./QuizCard";
import { addAttemptAPI } from "@/actions/attempts.actions";
import { useEffect, useState } from "react";

interface IQuizzesPage {
  quizzes?: IQuiz[];
}

export default function QuizzesPage({ quizzes }: IQuizzesPage) {
  const [loading, setLoading] = useState(false);

  const redirect = useRouter();

  // Prefetch create-quiz route to make first navigation instant
  useEffect(() => {
    redirect.prefetch?.("/create-quiz");
  }, [redirect]);

  async function createAttempt(quizId: string) {
    try {
      setLoading(true);
      const newAttempt = await addAttemptAPI(quizId);
      if (newAttempt.success) {
        // redirect to quiz exam page
        redirect.push(`/quiz/${quizId}/${newAttempt.attemptId}`);
        setLoading(false);
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        <Link href={"/create-quiz"}>
          <Button>+ Create New Quiz</Button>
        </Link>
      </div>
      {quizzes?.map((quiz) => (
        <QuizCard
          loading={loading}
          onClick={() => createAttempt(quiz.quizId)}
          quiz={quiz}
          key={quiz.quizId}
        />
      ))}
    </div>
  );
}
