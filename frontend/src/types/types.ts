export interface ICreateQuizPayload {
    title: string;
    duration: number;
}

export interface ICreateQuizResponse {
    success: boolean,
    message: string,
    error?: string
}

export interface IFetchAllQuizzesResponse {
    success: boolean,
    message: string,
    error?: string,
    quiz: IQuiz[]
}

export interface IQuiz {
    quizId: string,
    title: string,
    noOfQuestions: number,
    duration: number,
    createdAt: Date,
    updatedAt: Date
}