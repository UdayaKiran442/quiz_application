export default async function ReportsPage({ params }: { params: Promise<{ reportId: string }> }) {
    const { reportId } = await params
    return (
        <p>{reportId}</p>
    )
}