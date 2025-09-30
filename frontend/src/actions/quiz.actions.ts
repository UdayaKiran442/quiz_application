import { ICreateQuizPayload, ICreateQuizResponse, IFetchAllQuizzesResponse } from "@/types/types";

export async function createQuizAPI(payload: ICreateQuizPayload): Promise<ICreateQuizResponse> {
    try {
        const newQuiz = await fetch("http://localhost:8080/v1/quiz/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await newQuiz.json()
    } catch (error) {
        return (error as ICreateQuizResponse);
    }
}

export async function fetchAllQuizzesAPI(): Promise<IFetchAllQuizzesResponse> {
    try {
        const quizzes = await fetch("http://localhost:8080/v1/quiz", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await quizzes.json()
    } catch (error) {
        return (error as IFetchAllQuizzesResponse)
    }
}