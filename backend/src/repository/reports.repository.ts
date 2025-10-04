import { eq, sql } from "drizzle-orm";
import { AddReportToDBError } from "../exceptions/reports.exceptions";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { reports, submissions } from "./schema";

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

export async function fetchReportFromDB(reportId: string){
    try {
        const report = await db.select({
            reportId: reports.reportId,
            quizId: reports.quizId,
            attemptId: reports.attemptId,
            score: reports.score,
            attemptedQuestions: reports.attemptedQuestions,
            unAttemptedQuestions: reports.unAttemptedQuestions,
            createdAt: reports.createdAt,
            submissions: sql`COALESCE(json_agg(${submissions}), '[]')`.as('submissions')
        })
        .from(reports)
        .leftJoin(submissions, eq(reports.attemptId, submissions.attemptId))
        .where(eq(reports.reportId, reportId))
        .groupBy(reports.reportId);
        return report[0];
    } catch (error) {
        
    }
}