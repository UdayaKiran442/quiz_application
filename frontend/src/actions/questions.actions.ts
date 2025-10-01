import { IAddQuestionsToQuizPayload, IAddQuestionsToQuizResponse } from "@/types/types";

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