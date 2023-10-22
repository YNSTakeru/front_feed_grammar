'use client'

import Theme from '@/themes/light'
import { Question, Video } from '@/types/database/tables'
import Link from 'next/link'
import { useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'

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
    queryProps,
    previousQuestion,
    children,
    ...props
}: {
    queryProps: QueryProps
    previousQuestion: Question
    children: React.ReactNode
}) => {
    const href = '/'

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    )
}

const SLink = styled(CustomLink)``

export default function QuestionPagination({
    video,
    questionId,
    sectionId,
    sectionTitle,
    content,
    questionTheme,
    nextQuestion,
    previousQuestion,
}: {
    video: Video
    questionId: number
    sectionId: number
    content: string
    sectionTitle: string
    questionTheme: string
    nextQuestion: Question
    previousQuestion: Question
}) {
    const navRef = useRef<HTMLDivElement>(null!)

    const queryProps = {
        sectionId,
        sectionTitle,
        questionId,
        content,
        questionTheme,
    }
    console.log(previousQuestion)

    return (
        <ThemeProvider theme={{ ...Theme }}>
            <SNav customRef={navRef}>
                <SLink
                    queryProps={queryProps}
                    previousQuestion={previousQuestion}>
                    前の問題
                </SLink>
            </SNav>
        </ThemeProvider>
    )
}
