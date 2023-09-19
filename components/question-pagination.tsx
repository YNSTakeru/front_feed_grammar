'use client'

import {
    QuestionHrefProps,
    VideoHrefProps,
    getQuestionHref,
    getQuestionHrefWithQuery,
    getSectionHref,
    getVideoHrefWithQUery,
} from '@/lib/href'
import {
    saveIsRestartStore,
    saveIsSolvedStore,
    setIsLoadedStore,
    useIsSolvedStore,
} from '@/store'
import Theme from '@/themes/light'
import { Video } from '@/types/database/tables'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ThemeProvider, css, styled } from 'styled-components'

type QueryProps = {
    sectionTitle: string
    sectionId: number
    questionId: number
    content: string
    questionTheme: string
    startQuestionId: number
    endQuestionId: number
    startSimilarVideoId: number
    endSimilarVideoId: number
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

function hasNextQuestion({
    endQuestionId,
    questionId,
}: {
    endQuestionId: number
    questionId: number
}) {
    return questionId < endQuestionId
}

function hasPreviousQuestion({
    startQuestionId,
    questionId,
}: {
    startQuestionId: number
    questionId: number
}) {
    return startQuestionId < questionId
}

function isMovingQuestion({
    questionId,
    startQuestionId,
    endQuestionId,
    isPrev,
    isNext,
}: {
    questionId: number
    startQuestionId: number
    endQuestionId: number
    isPrev?: boolean
    isNext?: boolean
}) {
    return (
        (isPrev && !hasPreviousQuestion({ startQuestionId, questionId })) ||
        (isNext && !hasNextQuestion({ endQuestionId, questionId }))
    )
}

function getCustomHref({
    similar,
    videoId,
    isNext,
    isPrev,
    previousId,
    nextId,
    hrefProps,
}: {
    similar?: boolean
    videoId?: number
    isNext?: boolean
    isPrev?: boolean
    previousId?: number
    nextId?: number
    hrefProps: QuestionHrefProps | VideoHrefProps
}) {
    if (!similar && !videoId) {
        return getQuestionHrefWithQuery(hrefProps)
    }
    if (!similar && videoId) {
        return getVideoHrefWithQUery({ videoId, ...hrefProps })
    }
    const { startSimilarVideoId, endSimilarVideoId } = hrefProps

    if (isPrev && previousId && previousId != endSimilarVideoId) {
        return getVideoHrefWithQUery({ videoId: previousId, ...hrefProps })
    }
    if (isNext && nextId && nextId != startSimilarVideoId) {
        return getVideoHrefWithQUery({ videoId: nextId, ...hrefProps })
    }

    return ''
}

const CustomLink = ({
    similar,
    videoId,
    isSolved,
    isNext,
    isPrev,
    previousId,
    nextId,
    queryProps,
    children,
    ...props
}: {
    similar?: boolean
    videoId?: number
    isSolved?: boolean
    isNext?: boolean
    isPrev?: boolean
    previousId?: number
    nextId?: number
    queryProps: QueryProps
    children: React.ReactNode
}) => {
    const {
        questionId,
        sectionId,
        content,
        questionTheme,
        sectionTitle,
        startQuestionId,
        endQuestionId,
        startSimilarVideoId,
        endSimilarVideoId,
    } = queryProps
    const sectionHref = getSectionHref({ sectionId })

    function getQuestionId({
        similar,
        previousId,
        nextId,
        questionId,
    }: {
        similar?: boolean
        previousId?: number
        nextId?: number
        questionId: number
    }) {
        if (similar) return questionId
        if (previousId) return previousId
        if (nextId) return nextId
        return questionId
    }

    const questionHref = getQuestionHref({
        sectionHref,
        questionId: getQuestionId({ similar, previousId, nextId, questionId }),
    })

    const hrefProps = {
        questionHref,
        sectionTitle,
        questionContent: content,
        questionTheme,
        startQuestionId,
        endQuestionId,
        startSimilarVideoId,
        endSimilarVideoId,
    }

    const href = getCustomHref({
        similar,
        videoId,
        isNext,
        isPrev,
        previousId,
        nextId,
        hrefProps,
    })

    if (similar && videoId) {
        return null
    }

    if (similar && href != '') {
        return (
            <Link href={href} {...props}>
                {children}
            </Link>
        )
    }
    if (similar && href == '') {
        return (
            <Link href={''} tabIndex={-1} {...props}>
                {children}
            </Link>
        )
    }

    return (
        <>
            {isMovingQuestion({
                questionId,
                startQuestionId,
                endQuestionId,
                isPrev,
                isNext,
            }) ? (
                <Link href={href} {...props}>
                    {children}
                </Link>
            ) : videoId ? (
                <Link href={isSolved ? href : ''} {...props} tabIndex={-1}>
                    {children}
                </Link>
            ) : (
                <Link href={''} tabIndex={-1} {...props}>
                    {children}
                </Link>
            )}
        </>
    )
}

const SLink = styled(CustomLink)`
    ${({
        videoId,
        queryProps,
        isPrev,
        isNext,
        similar,
        previousId,
        nextId,
    }) => {
        const { startQuestionId, endQuestionId, questionId } = queryProps
        if (!similar && videoId) {
            return css`
                transition: color 0.3s;
            `
        }

        if (
            !similar &&
            isMovingQuestion({
                questionId,
                startQuestionId,
                endQuestionId,
                isPrev,
                isNext,
            })
        ) {
            return css`
                cursor: not-allowed;
                transition: color 0.3s;
            `
        }

        if (isPrev && !previousId) {
            return css`
                cursor: not-allowed;
                transition: color 0.3s;
            `
        }

        if (isNext && !nextId) {
            return css`
                cursor: not-allowed;
                transition: color 0.3s;
            `
        }
    }}

    ${({ isSolved, videoId }) => {
        if (videoId) {
            return !isSolved
                ? css`
                      cursor: not-allowed;
                  `
                : css`
                      cursor: pointer;
                  `
        }
    }}

    color: ${({
        videoId,
        isSolved,
        queryProps,
        theme,
        isPrev,
        isNext,
        previousId,
        nextId,
        similar,
    }) => {
        const { startQuestionId, endQuestionId, questionId } = queryProps
        const { deactiveColor } = theme
        if (!similar && videoId) {
            const { deactiveColor } = theme
            return !isSolved ? deactiveColor : 'black'
        }

        if (
            !similar &&
            isMovingQuestion({
                questionId,
                startQuestionId,
                endQuestionId,
                isPrev,
                isNext,
            })
        ) {
            return deactiveColor
        }
        if (isPrev && !previousId) {
            return deactiveColor
        }
        if (isNext && !nextId) {
            return deactiveColor
        }
    }};
    &:hover {
        color: ${({
            videoId,
            isSolved,
            queryProps,
            theme,
            isPrev,
            isNext,
            previousId,
            nextId,
            similar,
        }) => {
            const { startQuestionId, endQuestionId, questionId } = queryProps
            const { deactiveColor, hoverColor } = theme
            if (!similar && videoId) {
                return isSolved ? hoverColor : deactiveColor
            }

            if (
                !similar &&
                isMovingQuestion({
                    questionId,
                    startQuestionId,
                    endQuestionId,
                    isPrev,
                    isNext,
                })
            ) {
                return deactiveColor
            }

            if (isPrev && !previousId) {
                return deactiveColor
            }
            if (isNext && !nextId) {
                return deactiveColor
            }

            return hoverColor
        }};
    }
`

const CustomLi = ({
    isSolved,
    onClick,
    children,
    ...props
}: {
    isSolved: boolean
    onClick: () => void
    children: React.ReactNode
}) => (
    <li onClick={onClick} {...props}>
        {children}
    </li>
)

const SLi = styled(CustomLi)`
    cursor: pointer;
    transition: color 0.3s;

    ${({ isSolved }) => {
        return !isSolved
            ? css`
                  cursor: not-allowed;
              `
            : css`
                  cursor: pointer;
              `
    }}

    color: ${({ isSolved, theme }) => {
        const { deactiveColor } = theme
        return !isSolved ? deactiveColor : 'black'
    }};

    &:hover {
        color: ${({ isSolved, theme }) => {
            const { deactiveColor, hoverColor } = theme
            return isSolved ? hoverColor : deactiveColor
        }};
    }
`

export default function QuestionPagination({
    similar,
    video,
    questionId,
    sectionId,
    content,
    sectionTitle,
    previousId,
    nextId,
    startSimilarVideoId,
    endSimilarVideoId,
    questionTheme,
    startQuestionId,
    endQuestionId,
}: {
    similar?: boolean
    video: Video
    questionId: number
    sectionId: number
    content: string
    sectionTitle: string
    previousId?: number
    nextId?: number
    startSimilarVideoId: number
    endSimilarVideoId: number
    questionTheme: string
    startQuestionId: number
    endQuestionId: number
}) {
    const queryProps = {
        sectionId,
        sectionTitle,
        questionId,
        content,
        questionTheme,
        startQuestionId,
        endQuestionId,
        startSimilarVideoId,
        endSimilarVideoId,
    }

    const { isSolved } = useIsSolvedStore()
    const navRef = useRef<HTMLDivElement>(null!)

    useEffect(() => {
        saveIsSolvedStore(false)
        const top = navRef.current.getBoundingClientRect().top

        window.scrollBy({
            top,
            left: 0,
            behavior: 'smooth',
        })
    }, [])

    const clickHandler = () => {
        saveIsSolvedStore(false)
        saveIsRestartStore(true)
        setIsLoadedStore(false)
    }

    return (
        <ThemeProvider theme={{ ...Theme }}>
            <SNav customRef={navRef}>
                <SLink
                    queryProps={queryProps}
                    previousId={previousId}
                    isPrev
                    similar={similar}>
                    前の問題へ
                </SLink>
                <SLi isSolved={isSolved} onClick={clickHandler}>
                    もう一度解く
                </SLi>
                <SLink
                    isSolved={isSolved}
                    videoId={+video!.id}
                    queryProps={queryProps}
                    similar={similar}>
                    類似問題を解く
                </SLink>
                <SLink
                    queryProps={queryProps}
                    nextId={nextId}
                    isNext
                    similar={similar}>
                    次の問題へ
                </SLink>
            </SNav>
        </ThemeProvider>
    )
}
