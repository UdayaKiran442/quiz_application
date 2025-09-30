import { ICreateQuizPayload, ICreateQuizResponse } from "@/types/types";

export async function createQuizAPI(payload: ICreateQuizPayload): Promise<ICreateQuizResponse> {
    try {
        const newJob = await fetch("http://localhost:8080/v1/quiz/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await newJob.json()
    } catch (error) {
        return (error as ICreateQuizResponse);
    }
}