import { fetchQuestionsByQuizIdAPI } from "@/actions/questions.actions";
import QuestionsPage from "@/components/QuestionsPage";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";


export default async function Home({ params }: { params: Promise<{ quizId: string }> }) {
    const { quizId } = await params;
    const questions = await fetchQuestionsByQuizIdAPI(quizId)
    if (!questions.success) {
        toast.error("Failed to start the quiz");
        redirect("/")
    }
    return (
        <>
            <QuestionsPage questions={questions.questions} length={questions.questions.length} />
        </>
    );
}