import Button from "./ui/Button";
import { Input } from "./ui/Input";

const CreateQuiz = () => {
  return (
    <>
      <div className="flex justify-start p-8">
        <Button>Go back to all quizzes</Button>
      </div>
      <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">Create New Quiz</h3>
          <p className="text-gray-400 mt-2">
            Fill in the details to create a new quiz
          </p>
        </div>
        <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-lg">
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title for the quiz"
          />
          <Input
            type="number"
            name="duration"
            id="duration"
            placeholder="Enter duration for the quiz in minutes"
          />
          <Button>Create Quiz</Button>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
