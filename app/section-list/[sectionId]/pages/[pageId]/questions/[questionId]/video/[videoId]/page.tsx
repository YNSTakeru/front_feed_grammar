import FetchSimilarQuestionDetail from '@/components/fetch-similar-question-detail'
import { SimilarQuestionDetailPageProps } from '@/types/pages'

export default async function SimilarQuestionDetailPage({
    params,
}: SimilarQuestionDetailPageProps) {
    const { videoId, questionId, sectionId } = params
    // 普通に問題解いて、類似問題、次の問題でエラー
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
