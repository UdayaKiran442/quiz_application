"use client"

import { useState } from "react"
import Button from "./ui/Button"
import { submitQuestionAPI } from "@/actions/submit.actions"
import { toast } from "react-toastify"

interface IQuestionsPageProps {
    questions: {
        questionId: string,
        quizId: string,
        title: string,
        questionText: string,
        options: Record<string, string>
    }[],
    length: number,
    attemptId: string,
}

export default function QuestionsPage({ questions, length, attemptId }: IQuestionsPageProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const currentQuestion = questions[currentIndex]

    const handleAnswerChange = (questionId: string, optionKey: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionKey,
        }));
    };

    async function onClickNext(questionId: string, quizId: string) {
        setCurrentIndex(currentIndex + 1);
        try {
            const submitQuestionRes = await submitQuestion(questionId, quizId);
            if (submitQuestionRes && !submitQuestionRes.success) {
                toast.error("Try submitting question again");
            }
        } catch (error) {

        }
    }

    async function submitQuestion(questionId: string, quizId: string) {
        try {
            return await submitQuestionAPI({
                attemptId,
                option: answers[questionId],
                questionId,
                quizId
            })
        } catch (error) {

        }
    }

    async function submitQuiz(questionId: string, quizId: string) {
        try {
            const submitQuestionRes = await submitQuestion(questionId, quizId);
            if (submitQuestionRes && !submitQuestionRes.success) {
                toast.error("Try submitting question again");
            }
        } catch (error) {

        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 ">
            <div>
                <h3 className="text-red-500 text-xl font-semibold text-center">{questions[0].title}</h3>
            </div>
            {/* question */}
            <div className="flex gap-1">
                <p>{currentIndex + 1}.</p>
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
                                // write on checked here
                                onChange={() => handleAnswerChange(currentQuestion.questionId, key)}
                                checked={answers[currentQuestion.questionId] === key}
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
                {currentIndex > 0 && (
                    <Button onClick={() => setCurrentIndex(currentIndex - 1)}>Previous</Button>
                )}
                {currentIndex + 1 === length ? (
                    <Button onClick={() => submitQuiz(currentQuestion.questionId, currentQuestion.quizId)}>Submit</Button>
                ) : (
                    <Button onClick={() => onClickNext(currentQuestion.questionId, currentQuestion.quizId)}>Next</Button>
                )}
            </div>
        </div>
    )
}