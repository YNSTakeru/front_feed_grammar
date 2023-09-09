import FetchQuestionDetail from '@/components/fetch-question-detail'
import { QuestionDetailPageProps } from '@/types/pages'

export default async function QuestionDetailPage({
    params,
}: QuestionDetailPageProps) {
    const { questionId, sectionId } = params
    // データベースから値を取得する

    return (
        <>
            {/*@ts-ignore*/}
            <FetchQuestionDetail
                questionId={+questionId}
                sectionId={+sectionId}
            />
        </>
    )
}
