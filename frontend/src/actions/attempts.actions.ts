import { IAddAttemptResponse } from "@/types/types";

export async function addAttemptAPI(quizId: string): Promise<IAddAttemptResponse> {
    try {
        const newAttempt = await fetch(`http://localhost:8080/v1/attempts/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quizId })
        })
        return await newAttempt.json()
    } catch (error) {
        return (error as IAddAttemptResponse);
    }
}