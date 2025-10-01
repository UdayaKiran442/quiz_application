import { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { IQuestion } from "@/types/types";

interface IQuestionsProps {
    index: number,
    q: IQuestion,
    questions: IQuestion[],
    setQuestions: Dispatch<SetStateAction<IQuestion[]>>,

}

export default function Questions({ index, questions, q, setQuestions }: IQuestionsProps) {
    return (
        <div key={index} className="border border-gray-600 rounded-lg p-4 mb-4">
            <Label id={`question-${index}`} label={`Question ${index + 1}`} />
            <Input
                type="text"
                id={`question-${index}`}
                name={`question-${index}`}
                placeholder="Enter question text"
                value={q.questionText}
                onChange={(e) => {
                    const updated = [...questions];
                    updated[index].questionText = e.target.value;
                    setQuestions(updated);
                }}
            />

            {/* Options */}
            <div className="mt-3">
                <h5 className="font-medium text-sm">Options</h5>
                {Object.entries(q.options).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 mt-2">
                        <Label id={`${index}-opt-${key}`} label={key} />
                        <Input
                            type="text"
                            id={`${index}-opt-${key}`}
                            name={`${index}-opt-${key}`}
                            placeholder={`Enter option ${key}`}
                            value={value}
                            onChange={(e) => {
                                const updated = [...questions];
                                updated[index].options[key] = e.target.value;
                                setQuestions(updated);
                            }}
                        />
                        <input
                            type="radio"
                            name={`correct-${index}`}
                            checked={q.correctOption === key}
                            onChange={() => {
                                const updated = [...questions];
                                updated[index].correctOption = key;
                                setQuestions(updated);
                            }}
                        />
                        <span className="text-sm text-gray-300">Correct</span>
                    </div>
                ))}
            </div>
        </div>
    )
}