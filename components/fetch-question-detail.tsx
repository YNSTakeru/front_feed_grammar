import {
    fetchNextQuestion,
    fetchPreviousQuestion,
    fetchVideos,
} from '@/lib/fetchData'
import QuestionDetail from './question-detail'

export default async function FetchQuestionDetail({
    questionId,
    sectionId,
}: {
    questionId: number
    sectionId: number
}) {
    const videos = await fetchVideos(questionId)
    const nextQuestion = await fetchNextQuestion({ sectionId, questionId })
    const previousQuestion = await fetchPreviousQuestion({
        sectionId,
        questionId,
    })

    return (
        <QuestionDetail
            videos={videos}
            questionId={questionId}
            sectionId={sectionId}
            nextData={nextQuestion}
            previousData={previousQuestion}
        />
    )
}
