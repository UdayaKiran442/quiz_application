import { fetchQuestionsByQuizIdAPI } from "@/actions/questions.actions";
import QuestionsPage from "@/components/QuestionsPage";
import { redirect } from "next/navigation";


export default async function Home({ params }: { params: Promise<{ quizId: string, attemptId: string }> }) {
    const { quizId, attemptId } = await params;
    const questions = await fetchQuestionsByQuizIdAPI(quizId)
    if (!questions.success) {
        redirect("/")
    }
    return (
        <>
            <QuestionsPage attemptId={attemptId} questions={questions.questions} length={questions.questions.length} />
        </>
    );
}