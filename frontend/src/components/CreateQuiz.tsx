"use client";

import { ArrowLeft } from "lucide-react";
import { z } from 'zod'

import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { useState } from "react";
import { ICreateQuizPayload } from "@/types/types";
import { Label } from "./ui/Label";
import { createQuizAPI } from "@/actions/quiz.actions";
import Link from "next/link";

const CreateQuiz = () => {
  const [createQuiz, setCreateQuiz] = useState<ICreateQuizPayload>({
    title: "",
    duration: 1,
  });
  const [errors, setErrors] = useState<{
    title?: string;
    duration?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<{
    questionText: string,
    options: Record<string, string>,
    correctOption: string
  }[]>([]);

  const createQuizSchema = z.object({
    title: z.string().min(1, "Title is required"),
    duration: z.number().min(1, "Duration must be at least 1 minute")
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;

    // Clear error for the current field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof errors];
        return newErrors;
      });
    }

    setCreateQuiz({
      ...createQuiz,
      [e.target.name]: e.target.value
    });
  }

  async function onSubmit() {
    setLoading(true);
    const validation = createQuizSchema.safeParse(createQuiz);
    if (!validation.success) {
      // Convert Zod errors to a more usable format
      const newErrors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        const path = issue.path[0] as string;
        newErrors[path] = issue.message;
      });
      setErrors(newErrors);
      setLoading(false);
    }
    try {
      const result = await createQuizAPI(createQuiz);
      if (result.success) {
        setCreateQuiz({
          title: "",
          duration: 1
        })
        setLoading(false)
      }
    } catch (error) {

    }


  }

  return (
    <>
      <div className="flex justify-start p-8">
        <Link href={"/"} >
          <Button className="flex justify-center items-center">
            <ArrowLeft className="mr-2" />
            Go Back to quizzes
          </Button>
        </Link>
      </div>
      <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Create New Quiz</h3>
          <p className="text-gray-400 mt-2">
            Fill in the details to create a new quiz
          </p>
        </div>
        <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-lg">
          <div>
            <Label id="title" label="Title" />
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title for the quiz"
              value={createQuiz?.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          <div>
            <Label id="duration" label="Duration(in minutes)" />
            <Input
              type="number"
              name="duration"
              id="duration"
              placeholder="Enter duration for the quiz in minutes"
              value={createQuiz.duration}
              onChange={handleChange}
              min="1"
              max="240"
              className={errors.duration ? "border-red-500" : ""}
            />
            {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
          </div>
          {/* Questions */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Add Questions</h4>

            {questions && questions.map((q, index) => (
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
            ))}

            <Button
              className="mt-2"
              onClick={() =>
                setQuestions([
                  ...questions,
                  { questionText: "", options: { A: "", B: "", C: "", D: "" }, correctOption: "" }
                ])
              }
            >
              + Add Question
            </Button>
          </div>

          <Button disabled={loading} onClick={onSubmit}>{loading ? "Creating Quiz...." : "Create Quiz"}</Button>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
