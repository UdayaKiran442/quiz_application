"use client"

import Link from "next/link";

import Button from "./ui/Button";
import { IQuiz } from "@/types/types";
import QuizCard from "./QuizCard";

interface IQuizzesPage {
  quizzes: IQuiz[]
}

export default function QuizzesPage({ quizzes }: IQuizzesPage) {


  return (
    <div>
      <div className="flex justify-end p-4">
        <Link href={"/create-quiz"}>
          <Button>+ Create New Quiz</Button>
        </Link>
      </div>
      {quizzes.map((quiz) => (
        <QuizCard quiz={quiz} key={quiz.quizId} />
      ))}
    </div>
  );
};
