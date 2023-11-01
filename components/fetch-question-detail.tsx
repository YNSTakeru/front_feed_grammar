import { fetchQuestionLink, fetchVideos } from '@/lib/fetchData'
import QuestionDetail from './question-detail'

export default async function FetchQuestionDetail({
    sectionId,
    questionId,
    pageId,
}: {
    sectionId: number
    questionId: number
    pageId: string
}) {
    // Todo 正しく取得できていない
    const videos = await fetchVideos({ questionId: `${questionId}`, pageId })
    const { previousQuestion, nextQuestion } = await fetchQuestionLink(
        questionId,
    )

    return (
        <QuestionDetail
            videos={videos}
            questionId={questionId}
            sectionId={sectionId}
            pageId={pageId}
            nextQuestion={nextQuestion}
            previousQuestion={previousQuestion}
        />
    )
}
