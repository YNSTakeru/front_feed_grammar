import { fetchQuestionList } from '@/lib/fetchData'
import QuestionList from './question-list'

export default async function FetchQuestionList({
    sectionId,
}: {
    sectionId: number
}) {
    const questionList = await fetchQuestionList(sectionId)

    return <QuestionList questionList={questionList} sectionId={sectionId} />
}
