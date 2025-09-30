"use client";

import { ArrowLeft } from "lucide-react";
import { z } from 'zod'

import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { useState } from "react";
import { ICreateQuizPayload } from "@/types/types";
import { Label } from "./ui/Label";

const CreateQuiz = () => {
  const [createQuiz, setCreateQuiz] = useState<ICreateQuizPayload>({
    title: "",
    duration: 1,
  });

  const createQuizSchema = z.object({
    title: z.string(),
    duration: z.number().min(1)
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCreateQuiz({
      ...createQuiz,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit() {
    const result = createQuizSchema.safeParse(createQuiz)
    if (result.success && createQuiz.title !== "") {
      console.log(result.data)
    }
    else {
      console.log("ewek")
    }
  }

  return (
    <>
      <div className="flex justify-start p-8">
        <Button className="flex justify-center items-center">
          <ArrowLeft className="mr-2" />
          Go Back to quizzes
        </Button>
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
            />
          </div>
          <div>
            <Label id="duration" label="Duration(in minutes)" />
            <Input
              type="number"
              name="duration"
              id="duration"
              placeholder="Enter duration for the quiz in minutes"
              value={createQuiz?.duration}
              onChange={handleChange}
            />
          </div>
          <Button onClick={onSubmit}>Create Quiz</Button>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
