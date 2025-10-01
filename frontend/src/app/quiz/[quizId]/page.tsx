

export default async function Home({ params }: { params: Promise<{ quizId: string }> }) {
    const { quizId } = await params;
    return (
        <>
            <p>quizId: {quizId}</p>
        </>
    );
}