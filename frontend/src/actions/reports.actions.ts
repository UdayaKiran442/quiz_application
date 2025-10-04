import { IFetchReportByIDResponse } from "@/types/types";

export async function fetchReportByIdAPI(reportId: string): Promise<IFetchReportByIDResponse> {
    try {
        const fetchReport = await fetch("http://localhost:8080/v1/reports/fetch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reportId })
        })
        return await fetchReport.json();
    } catch (error) {
        return (error as IFetchReportByIDResponse)
    }
}