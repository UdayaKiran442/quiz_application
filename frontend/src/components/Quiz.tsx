import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import Button from "./ui/Button";
import { IQuiz } from "@/types/types";

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
        <div key={quiz.quizId} className="mt-5 mx-10 bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 ">
          <div className="p-5 flex justify-between items-center">
            <div>
              <h4 className="text-xl font-semibold text-white">{quiz.title}</h4>
              <p className="text-gray-400 mt-1 flex items-center">
                <Clock size={14} className="mr-1" />
                Duration: {quiz.duration} min
              </p>
            </div>
            <Button className="flex items-center justify-center gap-1">
              Take Quiz
              <ArrowRight />
            </Button>
          </div>
        </div>
      ))}

    </div>
  );
};
