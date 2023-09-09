'use client'

import {
    getQuestionHref,
    getQuestionHrefWithQuery,
    getSectionHref,
} from '@/lib/href'
import { getUrlQuery } from '@/lib/url-query'
import { Question } from '@/types/database/tables'
import Link from 'next/link'
import { styled } from 'styled-components'

const SLi = styled.li`
    display: flex;
    justify-content: space-between;
    gap: 40px;
    font-weight: 700;
`

export default function QuestionList({
    questionList,
    sectionId,
}: {
    questionList: Question[]
    sectionId: number
}) {
    const sectionTitle = getUrlQuery('title')!
    const sectionHref = getSectionHref({ sectionId })

    return (
        <>
            {questionList.map(({ id, content, theme }, i) => {
                const questionHref = getQuestionHref({
                    sectionHref,
                    questionId: id,
                })
                const href = getQuestionHrefWithQuery({
                    questionHref,
                    sectionTitle,
                    questionContent: content,
                    questionTheme: theme,
                    startQuestionId: questionList[0].id,
                    endQuestionId: questionList[questionList.length - 1].id,
                })
                return (
                    <SLi key={id}>
                        <Link href={href}>{content}</Link>
                    </SLi>
                )
            })}
        </>
    )
}
