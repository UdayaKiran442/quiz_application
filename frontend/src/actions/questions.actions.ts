import { IAddQuestionsToQuizPayload, IAddQuestionsToQuizResponse, IFetchQuestionsByQuizIdResponse } from "@/types/types";

export async function addQuestionsToQuizAPI(payload: IAddQuestionsToQuizPayload[]): Promise<IAddQuestionsToQuizResponse> {
    try {
        const newQuiz = await fetch("http://localhost:8080/v1/questions/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await newQuiz.json()
    } catch (error) {
        return (error as IAddQuestionsToQuizResponse);
    }
}


export async function fetchQuestionsByQuizIdAPI(quizId: string): Promise<IFetchQuestionsByQuizIdResponse> {
    try {
        const questions = await fetch("http://localhost:8080/v1/questions/fetch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quizId })
        })
        return await questions.json()
    } catch (error) {
        return (error as IFetchQuestionsByQuizIdResponse)
    }
}