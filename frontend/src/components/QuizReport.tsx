import { IReport } from "@/types/types"
import { CheckCircle2, XCircle } from "lucide-react"

interface IQuizReportProps {
    report: IReport
}

export default function QuizReport({ report }: IQuizReportProps) {
    const totalQuestions = report.attemptedQuestions + report.unAttemptedQuestions
    const scorePercentage = Math.round((report.score / totalQuestions) * 100)
    
    return (
        <div className="max-w-4xl mx-auto p-6 bg-black text-white rounded-lg shadow-lg shadow-red-900/20">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-red-500 mb-2">Quiz Report</h1>
                <p className="text-red-300">Completed on {new Date(report.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <p className="text-sm font-medium text-blue-700 mb-1">Score</p>
                    <p className="text-4xl font-bold text-blue-600">{report.score} / {totalQuestions}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                    <p className="text-sm font-medium text-green-700 mb-1">Correct Answers</p>
                    <p className="text-4xl font-bold text-green-600">{report.score}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                    <p className="text-sm font-medium text-yellow-700 mb-1">Percentage</p>
                    <p className="text-4xl font-bold text-yellow-600">{scorePercentage}%</p>
                </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-red-300">Your Score</span>
                    <span className="text-sm font-medium text-red-300">{scorePercentage}%</span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full ${scorePercentage >= 70 ? 'bg-green-500' : scorePercentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${scorePercentage}%` }}
                    ></div>
                </div>
            </div>
            
            {/* Questions Breakdown */}
            <div className="space-y-6 text-red-500">
                <h2 className="text-xl font-semibold text-red-500 mb-4">Question Breakdown</h2>
                
                {report.submissions.map((submission, index) => (
                    <div key={submission.questionId} className="border border-gray-800 bg-gray-900 rounded-lg p-4 hover:shadow-md hover:shadow-red-500/20 transition-all">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center ${submission.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {submission.isCorrect ? (
                                        <CheckCircle2 size={16} />
                                    ) : (
                                        <XCircle size={16} />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium text-white">Question {index + 1}</p>
                                    <p className="text-sm text-gray-300">
                                        Your answer: <span className={`font-medium ${submission.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                            {submission.option}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${submission.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {submission.isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Final Message */}
            <div className="mt-10 text-center">
                {scorePercentage >= 70 ? (
                    <p className="text-green-600 font-medium">Great job! You've passed the quiz successfully! 🎉</p>
                ) : (
                    <p className="text-yellow-600 font-medium">Good attempt! Review your answers and try again to improve your score! 💪</p>
                )}
            </div>
        </div>
    )
}