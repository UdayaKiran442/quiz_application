export interface ICreateQuizPayload {
    title: string;
    duration: number;
    noOfQuestions: number;
}

export interface ICreateQuizResponse {
    success: boolean,
    message: string,
    quizId: string,
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

export interface IQuestion {
    questionText: string,
    options: Record<string, string>,
    correctOption: string
}

export interface IAddQuestionsToQuizPayload extends IQuestion {
    quizId: string,
}

export interface IAddQuestionsToQuizResponse {
    success: boolean,
    message: string,
    error?: string,
}