import { fetchAllQuizzesAPI } from "@/actions/quiz.actions";
import QuizzesPage from "@/components/Quiz";

export default async function Home() {
  const quizzes = await fetchAllQuizzesAPI();
  return (
    <>
      <QuizzesPage quizzes={quizzes.quiz} />
    </>
  );
}
