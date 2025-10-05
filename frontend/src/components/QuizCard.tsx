"use client"

import { ArrowRight, Clock } from "lucide-react"

import { IQuiz } from "@/types/types"
import Button from "./ui/Button"

interface IQuizCard {
    quiz: IQuiz,
    loading: boolean,
    onClick: () => void
}

export default function QuizCard({ quiz, loading, onClick }: IQuizCard) {
    return (
        <div key={quiz.quizId} className="mt-5 mx-10 bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 ">
            <div className="p-5 flex justify-between items-center">
                <div>
                    <h4 className="text-xl font-semibold text-white">{quiz.title}</h4>
                    <p className="text-gray-400 mt-1 flex items-center">
                        <Clock size={14} className="mr-1" />
                        Duration: {quiz.duration} min
                    </p>
                    <p className="text-gray-400 mt-1">Created At: {new Date(quiz.createdAt).toDateString()}</p>
                </div>
                <Button disabled={loading} onClick={onClick} className="flex items-center justify-center gap-1">
                    {loading ? "Loading..." : "Take Quiz"}
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}