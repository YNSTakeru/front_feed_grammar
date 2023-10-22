'use client'

import {
    getQuestionHref,
    getQuestionHrefWithQuery,
    getSectionHref,
} from '@/lib/href'
import { getUrlQuery } from '@/lib/url-query'
import { QuestionCollection } from '@/types/database/tables'
import Link from 'next/link'
import { styled } from 'styled-components'

const SLi = styled.li`
    display: flex;
    justify-content: space-between;
    gap: 40px;
    font-weight: 700;
`

export default function QuestionList({
    questionListData,
    sectionId,
}: {
    questionListData: QuestionCollection
    sectionId: number
}) {
    const sectionTitle = getUrlQuery('title')!
    const sectionHref = getSectionHref({ sectionId })
    const questionList = questionListData.data

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

                const href = getQuestionHrefWithQuery({
                    questionHref,
                    sectionTitle,
                    questionContent: content,
                    questionTheme: theme,
                    nextQuestionId: nextQuestion ? nextQuestion.id : null,
                    previousQuestionId: previousQuestion
                        ? previousQuestion.id
                        : null,
                    nextQuestionContent: nextQuestion
                        ? nextQuestion.content
                        : '',
                    nextQuestionTheme: nextQuestion ? nextQuestion.theme : '',
                    previousQuestionContent: previousQuestion
                        ? previousQuestion.content
                        : '',
                    previousQuestionTheme: previousQuestion
                        ? previousQuestion.theme
                        : '',
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
