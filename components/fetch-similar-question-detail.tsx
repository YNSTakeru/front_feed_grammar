import { fetchVideos } from '@/lib/fetchData'
import QuestionDetail from './question-detail'

export default async function FetchSimilarQuestionDetail({
    videoId,
    questionId,
    sectionId,
    pageId,
}: {
    videoId: number
    questionId: number
    sectionId: number
    pageId: string
}) {
    const videos = await fetchVideos(questionId)

    return (
        <QuestionDetail
            sectionId={sectionId}
            pageId={pageId}
            questionId={questionId}
            videos={videos}
            isSimilar
            videoId={videoId}
        />
    )
}
