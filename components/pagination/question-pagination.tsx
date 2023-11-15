/* eslint-disable */

"use client"

import Theme from "@/themes/light"
import Link from "next/link"
import { useRef } from "react"
import styled, { ThemeProvider, css } from "styled-components"

type Question = {
    content: string
    id: number
    section_id: number
    theme: string
}

type QueryProps = {
    sectionTitle: string
    sectionId: number
    questionId: number
    content: string
    questionTheme: string
}

const CustomNav = ({
    customRef,
    className,
    children,
    ...props
}: {
    customRef: React.MutableRefObject<HTMLDivElement | null>
    className?: string
    children: React.ReactNode
}) => (
    <nav
        ref={customRef}
        className={`question__pagination ${className}`}
        {...props}>
        {children}
    </nav>
)
const SNav = styled(CustomNav)`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`
const CustomLink = ({
    title,
    pageId,
    question,
    children,
    ...props
}: {
    title: string
    pageId: string
    question: Question | undefined
    children: React.ReactNode
}) => {
    if (!question) return <div {...props}>{children}</div>

    const { content, id, section_id, theme } = question!

    const href = `/section-list/${section_id}/pages/${pageId}/questions/${id}?title=${title}&content=${content}&question-theme=${theme}`

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    )
}

const SLink = styled(CustomLink)`
    ${({ question, theme }) => {
        const { deactiveColor } = theme
        return question
            ? css``
            : css`
                  cursor: not-allowed;
                  color: ${deactiveColor};
              `
    }}
`

export default function QuestionPagination({
    title,
    pageId,
    nextQuestion,
    previousQuestion,
}: {
    title: string
    pageId: string
    nextQuestion: Question | undefined
    previousQuestion: Question | undefined
}) {
    const navRef = useRef<HTMLDivElement>(null!)

    return (
        <ThemeProvider theme={{ ...Theme }}>
            <SNav customRef={navRef}>
                <SLink
                    title={title}
                    pageId={pageId}
                    question={previousQuestion}>
                    前の問題
                </SLink>
                <SLink title={title} pageId={pageId} question={nextQuestion}>
                    次の問題
                </SLink>
            </SNav>
        </ThemeProvider>
    )
}
