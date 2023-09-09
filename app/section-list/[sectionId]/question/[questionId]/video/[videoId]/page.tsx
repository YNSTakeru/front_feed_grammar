import FetchSimilarQuestionDetail from '@/components/fetch-similar-question-detail'
import { SimilarQuestionDetailPageProps } from '@/types/pages'

export default async function SimilarQuestionDetailPage({
    params,
}: SimilarQuestionDetailPageProps) {
    const { videoId, questionId, sectionId } = params

    return (
        <>
            {/*@ts-ignore*/}
            <FetchSimilarQuestionDetail
                videoId={+videoId}
                questionId={+questionId}
                sectionId={+sectionId}
            />
        </>
    )
}
