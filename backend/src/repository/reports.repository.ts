import { AddReportToDBError } from "../exceptions/reports.exceptions";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { reports } from "./schema";

export async function addReportInDB(payload: {
    quizId: string,
    attemptId: string,
    score: number,
    attemptedQuestions: number,
    unAttemptedQuestions: number,
}){
    try {
        const insertPayload ={
            reportId: `report_${generateNanoId()}`,
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await db.insert(reports).values(insertPayload);
        return insertPayload.reportId;
    } catch (error) {
        throw new AddReportToDBError("Failed to add report to DB", { cause: (error as Error).message });
    }
}