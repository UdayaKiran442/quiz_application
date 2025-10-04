import { GetQuizByIdFromDBError } from "../exceptions/quiz.exceptions";
import { AddReportToDBError } from "../exceptions/reports.exceptions";
import { FetchSubmissionsByAttemptIdFromDBError, SubmitQuestionError, SubmitQuestionInDBError, SubmitQuizError } from "../exceptions/submit.exceptions";
import { getQuizByIdFromDB } from "../repository/quiz.repository";
import { addReportInDB } from "../repository/reports.repository";
import { fetchSubmissionsByAttemptIdFromDB, submitQuestionInDB } from "../repository/submit.repository";
import { ISubmitQuestionSchema, ISubmitQuizSchema } from "../routes/v1/submit.route";

export async function submitQuestion(payload: ISubmitQuestionSchema){
    try {
        return await submitQuestionInDB(payload);
    } catch (error) {
        if(error instanceof SubmitQuestionInDBError) {
            throw error;
        }
        throw new SubmitQuestionError("Failed to submit question", { cause: (error as Error).message });
    }
}

export async function submitQuiz(payload: ISubmitQuizSchema){
    try {
        const [submissions, quiz] = await Promise.all([
             fetchSubmissionsByAttemptIdFromDB(payload.attemptId),
             getQuizByIdFromDB(payload.quizId)
        ])
        if((submissions && submissions.length > 0) && (quiz && quiz.length > 0)) {
            // calculate score 
            const score = submissions.filter((submission) => submission.isCorrect).length;
            // calculate attempted questions
            const attemptedQuestions = submissions.length;
            // calculate unattempted questions
            const unAttemptedQuestions = quiz[0].noOfQuestions - attemptedQuestions;
            // store report in db
            return await addReportInDB({
                quizId: payload.quizId,
                attemptId: payload.attemptId,
                score,
                attemptedQuestions,
                unAttemptedQuestions,
            })
        }
    } catch (error) {
        if (error instanceof AddReportToDBError || error instanceof FetchSubmissionsByAttemptIdFromDBError || error instanceof GetQuizByIdFromDBError) {
            throw error;
        }
        throw new SubmitQuizError("Failed to submit quiz", { cause: (error as Error).message });
    }
} 