export interface ICreateQuizPayload {
    title: string;
    duration: number;
}

export interface ICreateQuizResponse {
    success: boolean,
    message: string,
    error?: string
}