"use client"

import { IQuestion } from "@/types/types"
import { useEffect, useState } from "react"
import Button from "./ui/Button"

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
        questionId: string,
        questionText: string,
        options: Record<string, string>
    }>({
        questionId: "",
        questionText: "",
        options: {}
    })
    useEffect(() => {
        setCurrentQuestion({
            questionId: questions[index].questionId,
            questionText: questions[index].questionText,
            options: questions[index].options
        })
    }, [index])
    return (
        <div className="max-w-2xl mx-auto p-6 ">
            <div>
                <h3 className="text-red-500 text-xl font-semibold text-center">{questions[0].title}</h3>
            </div>
            {/* question */}
            <div className="flex gap-1">
                <p>{index + 1}.</p>
                <p>{currentQuestion.questionText}</p>
            </div>
            {/* options */}
            <div className="mt-2">
                {Object.entries(currentQuestion.options).map(([key, value], idx) => (
                    <div className="mt-2.5" key={idx}>
                        <label
                            key={key}
                            className="flex items-center gap-2 p-2 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700"
                        >
                            <input
                                type="radio"
                                name={currentQuestion.questionId}
                            />
                            <span>
                                <strong>{key}.</strong> {value}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
            {/* buttons */}
            <div className="flex justify-around mt-3">
                {index > 0 && (
                    <Button onClick={() => setIndex(index - 1)} >Previous</Button>
                )}
                {index + 1 === length ? (
                    <Button>Submit</Button>
                ) : (
                    <Button onClick={() => setIndex(index + 1)}>Next</Button>
                )}
            </div>
        </div>
    )
}