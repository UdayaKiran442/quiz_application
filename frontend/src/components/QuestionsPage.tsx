"use client"

import { IQuestion } from "@/types/types"
import { useState } from "react"

interface IQuestionsPageProps {
    questions: {
        questionId: string,
        quizId: string,
        title: string,
        questionText: string,
        options: Record<string, string>
    }[],
    length: number,
}

export default function QuestionsPage({ questions, length }: IQuestionsPageProps) {
    const [index, setIndex] = useState<number>(0)
    const [currentQuestion, setCurrentQuestion] = useState<{
        questionText: string,
        options: Record<string, string>
    }>({
        questionText: "",
        options: {}
    })
    return (
        <div className="p-4">
            <div>
                <h3 className="text-red-500 text-xl font-semibold text-center">{questions[0].title}</h3>
            </div>
            {/* question */}
            <div className="flex gap-1">
                <p>{index + 1}.</p>
                <p>{questions[index].questionText}</p>
            </div>
            {/* options */}
            <div className="mt-2">
                {Object.entries(questions[index].options).map(([key, value]) => (
                    <div className="mt-2.5">
                        <label
                            key={key}
                            className="flex items-center gap-2 p-2 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700"
                        >
                            <input
                                type="radio"
                                name={questions[index].questionId}
                            />
                            <span>
                                <strong>{key}.</strong> {value}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}