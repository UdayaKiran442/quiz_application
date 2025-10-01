import { fetchQuestionsByQuizIdAPI } from "@/actions/questions.actions";


export default async function Home({ params }: { params: Promise<{ quizId: string }> }) {
    const { quizId } = await params;
    const questions = await fetchQuestionsByQuizIdAPI(quizId)
    console.log(questions);
    return (
        <>
            <p>quizId: {quizId}</p>
        </>
    );
}