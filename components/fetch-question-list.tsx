import { fetchQuestionListData } from '@/lib/fetchData'
import QuestionList from './question-list'

export default async function FetchQuestionList({
    sectionId,
}: {
    sectionId: number
}) {
    const questionListData = await fetchQuestionListData({ sectionId })

    return (
        <QuestionList
            questionListData={questionListData}
            sectionId={sectionId}
        />
    )
}
