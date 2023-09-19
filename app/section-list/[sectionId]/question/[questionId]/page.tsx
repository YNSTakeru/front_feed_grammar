import FetchQuestionDetail from '@/components/fetch-question-detail'
import { QuestionDetailPageProps } from '@/types/pages'

export default async function QuestionDetailPage({
    params,
}: QuestionDetailPageProps) {
    const { questionId, sectionId } = params

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
