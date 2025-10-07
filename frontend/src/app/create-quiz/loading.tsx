export default function LoadingCreateQuiz() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-white" />
        <p className="text-gray-300">Loading Create Quiz...</p>
      </div>
    </div>
  );
}
