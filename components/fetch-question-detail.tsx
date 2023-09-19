import { fetchQuestionLink, fetchVideos } from '@/lib/fetchData'
import QuestionDetail from './question-detail'

export default async function FetchQuestionDetail({
    questionId,
    sectionId,
}: {
    questionId: number
    sectionId: number
}) {
    const videos = await fetchVideos(questionId)
    const { previousId, nextId } = await fetchQuestionLink(questionId)

    return (
        <QuestionDetail
            videos={videos}
            questionId={questionId}
            sectionId={sectionId}
            nextId={nextId}
            previousId={previousId}
        />
    )
}
