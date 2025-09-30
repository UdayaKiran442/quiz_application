import Link from "next/link";
import Button from "./ui/Button";

const Quiz = () => {
  return (
    <div>
      <div className="flex justify-end p-4">
        <Link href={"/create-quiz"}>
          <Button>Create New Quiz</Button>
        </Link>
      </div>
    </div>
  );
};

export default Quiz;
