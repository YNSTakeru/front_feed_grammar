import { fetchQuestionLink, fetchVideos } from '@/lib/fetchData'
import QuestionDetail from './question-detail'

export default async function FetchQuestionDetail({
    sectionId,
    questionId,
}: {
    sectionId: number
    questionId: number
}) {
    const videos = await fetchVideos(questionId)
    const { previousQuestion, nextQuestion } = await fetchQuestionLink(
        questionId,
    )

    return (
        <QuestionDetail
            videos={videos}
            questionId={questionId}
            sectionId={sectionId}
            nextQuestion={nextQuestion}
            previousQuestion={previousQuestion}
        />
    )
}
