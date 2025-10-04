import { fetchReportFromDB } from "../repository/reports.repository";
import { IFetchReport } from "../routes/v1/reports.route";

export async function fetchReport(payload: IFetchReport){
    try {
        return await fetchReportFromDB(payload.reportId);
    } catch (error) {
        
    }
}