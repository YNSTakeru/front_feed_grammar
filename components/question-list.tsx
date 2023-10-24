'use client'

import { getQuestionHref, getSectionHref } from '@/lib/href'
import { getUrlQuery } from '@/lib/url-query'
import { QuestionCollection } from '@/types/database/tables'
import Link from 'next/link'
import { styled } from 'styled-components'

const SUl = styled.ul`
    margin-top: 20px;
    display: flex;
    justify-content: start;
    gap: 40px;
`

const SLi = styled.li`
    display: flex;
    justify-content: space-between;
    gap: 40px;
    font-weight: 700;
`

export default function QuestionList({
    questionListData,
    sectionId,
    pageId,
}: {
    questionListData: QuestionCollection
    sectionId: number
    pageId: string
}) {
    const sectionTitle = getUrlQuery('title')!
    const sectionHref = getSectionHref({ sectionId })
    const questionList = questionListData.data
    const previousLink = questionListData.links.prev
        ? questionListData.links.prev
        : ''
    const nextLink = questionListData.links.next
        ? questionListData.links.next
        : ''

    const prevPageNum = previousLink[previousLink.length - 1]
    const nextPageNum = nextLink[nextLink.length - 1]

    // Todo URLにするよりpageを階層にした方がいいかも
    const sectionListPrevHref = `/section-list/${sectionId}?title=${sectionTitle}&page=${prevPageNum}`
    const sectionListNextHref = `/section-list/${sectionId}?title=${sectionTitle}&page=${nextPageNum}`

    return (
        <>
            {/* Todo next-content, previous-contentを渡す */}
            {questionList.map(({ id, content, theme }, i) => {
                const questionHref = getQuestionHref({
                    sectionHref,
                    questionId: id,
                })
                const nextQuestion = questionList[i + 1]
                    ? questionList[i + 1]
                    : null
                const previousQuestion = questionList[i - 1]
                    ? questionList[i - 1]
                    : null

                const href = `/section-list/${sectionId}/pages/${pageId}/questions/${id}?title=${sectionTitle}&content=${content}&question-theme=${theme}`

                return (
                    <SLi key={id}>
                        <Link href={href}>{content}</Link>
                    </SLi>
                )
            })}
            <SUl>
                <SLi>
                    <Link href={sectionListPrevHref}>前のページへ</Link>
                </SLi>
                <SLi>
                    <Link href={sectionListNextHref}>次のページへ</Link>
                </SLi>
            </SUl>
        </>
    )
}
