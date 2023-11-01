'use client'

import {
    getNextArrayValue,
    getPrevArrayValue,
    getRandomValueFromArray,
} from '@/lib/array'
import {
    QuestionHrefQuery,
    getQuestionHref,
    getQuestionHrefWithQuery,
    getSectionHref,
    getSectionHrefWithQuery,
} from '@/lib/href'
import { getUrlQuery } from '@/lib/url-query'
import { Video } from '@/types/database/tables'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import BreadcrumbsList from './breadcrumbs-list'
import QuestionPagination from './pagination/question-pagination'
import ProgressBar from './progress-bar'
import QuestionArea from './question-area'
import YouTubeArea from './youtube-area'

type Question = {
    content: string
    id: number
    section_id: number
    theme: string
}

type Videos = {
    video: Video
    previousVideo?: Video | null
    nextVideo?: Video | null
}

type BreadcrumbsListProps = QuestionHrefQuery & {
    sectionId: number
    questionId: number
    pageId: string
}

type VideoProps = {
    videos: Video[]
    startSimilarVideoId: number
    endSimilarVideoId: number
}

function getVideos({
    isSimilar,
    videoId,
    props,
}: {
    isSimilar?: boolean
    videoId?: number
    props: VideoProps
}): Videos {
    const { videos, startSimilarVideoId, endSimilarVideoId } = props

    if (isSimilar) {
        const video = videos.filter(({ id }) => id == videoId)[0]!

        let nextVideo = (getNextArrayValue({
            arry: videos,
            id: video.id,
        }) as unknown) as Video | null

        if (nextVideo!.id == startSimilarVideoId) nextVideo = null

        let previousVideo = (getPrevArrayValue({
            arry: videos,
            id: video.id,
        }) as unknown) as Video | null

        if (previousVideo!.id == endSimilarVideoId) previousVideo = null

        return { video, nextVideo, previousVideo }
    }

    const video = getRandomValueFromArray(videos)
    const nextVideo = (getNextArrayValue({
        arry: videos,
        id: video.id,
    }) as unknown) as Video | null

    return { video, nextVideo, previousVideo: null }
}
function getBreadcrumbsListContents({
    isSimilar,
    props,
}: {
    isSimilar?: boolean
    props: BreadcrumbsListProps
}) {
    return isSimilar
        ? getSimilarBreadcrumbsListContents(props)
        : getNormalBreadcrumbsListContents(props)
}

function getNormalBreadcrumbsListContents({
    sectionId,
    questionContent,
    sectionTitle,
    pageId,
}: BreadcrumbsListProps) {
    return [
        {
            href: `/section-list/${sectionId}/pages/${pageId}/?title=${sectionTitle}`,
            content: sectionTitle,
        },
        {
            content: questionContent,
        },
    ]
}

function getSimilarBreadcrumbsListContents({
    sectionId,
    questionId,
    sectionTitle,
    questionContent,
    questionTheme,
    startQuestionId,
    endQuestionId,
    startSimilarVideoId,
    endSimilarVideoId,
}: BreadcrumbsListProps) {
    const sectionHref = getSectionHref({ sectionId })
    const questionHref = getQuestionHref({ sectionHref, questionId })

    return [
        {
            href: getSectionHrefWithQuery({ sectionHref, sectionTitle }),
            content: sectionTitle,
        },
        {
            href: getQuestionHrefWithQuery({
                questionHref,
                sectionTitle,
                questionContent,
                questionTheme,
                startQuestionId,
                endQuestionId,
                startSimilarVideoId,
                endSimilarVideoId,
            }),
            content: questionContent,
        },
        {
            content: questionTheme,
        },
    ]
}

const SContainer = styled.div`
    @media (min-width: 768px) {
        margin: 0 40.5px;
    }
`

const SMainWrapper = styled.div`
    & .question__area {
        margin-top: 30px;
    }
    & .question__pagination {
        margin-top: 40px;
        margin-bottom: 30px;
    }
`

const STitle = styled.div`
    margin-bottom: 38px;
    padding: 0 40px 0 0;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.3;
    display: none;

    @media (min-width: 768px) {
        display: block;
    }
`

export default function QuestionDetail({
    videos,
    questionId,
    sectionId,
    pageId,
    isSimilar,
    videoId,
    previousQuestion,
    nextQuestion,
}: {
    videos: Video[]
    questionId: number
    sectionId: number
    pageId: string
    isSimilar?: boolean
    videoId?: number
    nextQuestion?: Question | undefined
    previousQuestion?: Question | undefined
}) {
    const [isDisplay, setDisplay] = useState(false)
    const [pageWidth, setPageWidth] = useState(0)

    const content = getUrlQuery('content')!
    const sectionTitle = getUrlQuery('title')!
    const questionTheme = getUrlQuery('question-theme')!
    const startQuestionId = +getUrlQuery('start-question-id')!
    const endQuestionId = +getUrlQuery('end-question-id')!
    const startSimilarVideoId = +getUrlQuery('start-similar-video-id')!
    const endSimilarVideoId = +getUrlQuery('end-similar-video-id')!

    const breadcrumbsListProps: BreadcrumbsListProps = {
        questionContent: content,
        questionTheme,
        startQuestionId,
        endQuestionId,
        startSimilarVideoId,
        endSimilarVideoId,
        sectionId,
        sectionTitle,
        questionId,
        pageId,
    }

    const breadcrumbsListContents = getBreadcrumbsListContents({
        isSimilar,
        props: breadcrumbsListProps,
    })

    const videoProps = {
        videos,
        startSimilarVideoId,
        endSimilarVideoId,
    }

    const paginateVideos = getVideos({
        isSimilar,
        videoId: +videos[0].id,
        props: videoProps,
    })!

    useEffect(() => {
        const padding = window.innerWidth > 896 ? 15 : 0
        setPageWidth(prev => window.innerWidth * 0.5 - padding)
        setDisplay(prev => true)
    }, [])

    return (
        <>
            {isDisplay && (
                <SContainer>
                    <BreadcrumbsList
                        contents={breadcrumbsListContents}
                        width={pageWidth}
                    />
                    <SMainWrapper>
                        <STitle>{isSimilar ? questionTheme : content}</STitle>
                        <YouTubeArea
                            video={paginateVideos.video}
                            width={pageWidth}
                        />
                        <ProgressBar
                            endTime={+paginateVideos.video.end_time}
                            startTime={+paginateVideos.video.start_time}
                        />
                        <QuestionArea
                            answer={paginateVideos.video.answer}
                            width={pageWidth}
                        />
                        <QuestionPagination
                            title={sectionTitle}
                            pageId={pageId}
                            nextQuestion={nextQuestion}
                            previousQuestion={previousQuestion}
                        />
                    </SMainWrapper>
                </SContainer>
            )}
        </>
    )
}
