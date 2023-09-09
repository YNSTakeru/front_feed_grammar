import { fetchVideos } from '@/lib/fetchData'
import QuestionDetail from './question-detail'

export default async function FetchSimilarQuestionDetail({
    videoId,
    questionId,
    sectionId,
}: {
    videoId: number
    questionId: number
    sectionId: number
}) {
    const videos = await fetchVideos(questionId)

    return (
        <QuestionDetail
            sectionId={sectionId}
            questionId={questionId}
            videos={videos}
            isSimilar
            videoId={videoId}
        />
    )
}
