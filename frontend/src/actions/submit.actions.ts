import { ISubmitQuestionPayload, ISubmitQuestionResponse, ISubmitQuizPayload, ISubmitQuizResponse } from "@/types/types";

export async function submitQuestionAPI(payload: ISubmitQuestionPayload): Promise<ISubmitQuestionResponse> {
    try {
        const submitQuestionResponse = await fetch(`http://localhost:8080/v1/submit/question`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await submitQuestionResponse.json()
    } catch (error) {
        return (error as ISubmitQuestionResponse)
    }
}

export async function submitQuizAPI(payload: ISubmitQuizPayload): Promise<ISubmitQuizResponse> {
    try {
        const submitQuizResponse = await fetch("http://localhost:8080/v1/submit/quiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await submitQuizResponse.json()
    } catch (error) {
        return (error as ISubmitQuizResponse)
    }
}