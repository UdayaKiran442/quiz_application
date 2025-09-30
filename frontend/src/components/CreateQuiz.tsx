import Button from "./ui/Button";
import { Input } from "./ui/Input";

const CreateQuiz = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      <div>
        <h3 className="text-2xl font-semibold mb-6">Create New Quiz</h3>
      </div>
      <div className="flex flex-col gap-7">
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
  );
};

export default CreateQuiz;
