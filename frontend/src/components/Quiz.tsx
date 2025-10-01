"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "./ui/Button";
import { IQuiz } from "@/types/types";
import QuizCard from "./QuizCard";
import { Modal } from "./Modal";
import { Input } from "./ui/Input";

interface IQuizzesPage {
  quizzes: IQuiz[]
}

export default function QuizzesPage({ quizzes }: IQuizzesPage) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");

  function onClick(quizId: string) {
    setShowModal(true)
    setSelectedQuizId(quizId)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        setSelectedQuizId("");
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowModal]); // Add setShowModal to the dependency array

  return (
    <div>
      <div className="flex justify-end p-4">
        <Link href={"/create-quiz"}>
          <Button>+ Create New Quiz</Button>
        </Link>
      </div>
      {quizzes.map((quiz) => (
        <QuizCard onClick={() => onClick(quiz.quizId)} quiz={quiz} key={quiz.quizId} />
      ))}
      {showModal &&
        <Modal setShowModal={setShowModal}>
          <div className="flex flex-col gap-3">
            <h4 className="text-red-500 text-lg">Fill you details to start the quiz</h4>
            <Input id="name" name="name" placeholder="Enter your name" type="text" />
            <Input id="email" name="email" placeholder="Enter your email" type="email" />
            <Input id="phone" name="phone" placeholder="Enter your phone number" type="text" />
          </div>
          <Button className="mt-5">Start Quiz</Button>

        </Modal>}
    </div>
  );
};
