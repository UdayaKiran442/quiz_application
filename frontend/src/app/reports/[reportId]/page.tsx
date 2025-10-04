import { fetchReportByIdAPI } from "@/actions/reports.actions"
import QuizReport from "@/components/QuizReport"

export default async function ReportsPage({ params }: { params: Promise<{ reportId: string }> }) {
    const { reportId } = await params
    const fetchReportRes = await fetchReportByIdAPI(reportId)
    return (
        <QuizReport report={fetchReportRes.report} />
    )
}