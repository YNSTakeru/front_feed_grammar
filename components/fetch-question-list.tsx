import { fetchQuestionListData } from "@/lib/fetchData"
import QuestionList from "./question-list"

export default async function FetchQuestionList({
    sectionId,
    pageId,
}: {
    sectionId: number
    pageId: string
}) {
    const questionListData = await fetchQuestionListData({
        sectionId,
        pageNum: +pageId,
    })

    return (
        <QuestionList
            questionListData={questionListData}
            sectionId={sectionId}
            pageId={pageId}
        />
    )
}
