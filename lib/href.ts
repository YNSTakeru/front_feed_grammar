type SectionHrefQuery = {
    sectionTitle: string
}

export type QuestionHrefQuery = SectionHrefQuery & {
    questionContent: string
    questionTheme: string
    nextQuestionId?: number | null
    previousQuestionId?: number | null
    nextQuestionContent?: string | null
    nextQuestionTheme?: string | null
    previousQuestionContent?: string | null
    previousQuestionTheme?: string | null
    startQuestionId: number
    endQuestionId: number
    startSimilarVideoId?: number
    endSimilarVideoId?: number
}

export type QuestionHrefProps = QuestionHrefQuery & {
    questionHref: string
}

export type VideoHrefProps = {
    videoId: number
} & QuestionHrefProps

export function getSectionHref({ sectionId }: { sectionId: number }) {
    return `/section-list/${sectionId}`
}

function getSectionQuery({ sectionTitle }: SectionHrefQuery) {
    return `?title=${sectionTitle}`
}

export function getSectionHrefWithQuery({
    sectionHref,
    sectionTitle,
}: {
    sectionHref: string
} & SectionHrefQuery) {
    return `${sectionHref}${getSectionQuery({ sectionTitle })}`
}

function getQuestionQuery({
    sectionTitle,
    questionContent,
    questionTheme,
    nextQuestionContent,
    nextQuestionTheme,
    previousQuestionContent,
    previousQuestionTheme,
    nextQuestionId,
    previousQuestionId,
    startQuestionId,
    endQuestionId,
    startSimilarVideoId,
    endSimilarVideoId,
}: QuestionHrefQuery) {
    return `${getSectionQuery({
        sectionTitle,
    })}&content=${questionContent}&question-theme=${questionTheme}&start-question-id=${startQuestionId}&end-question-id=${endQuestionId}&start-similar-video-id=${startSimilarVideoId}&end-similar-video-id=${endSimilarVideoId}&next-question-id=${nextQuestionId}&previous-question-id=${previousQuestionId}&next-question-content=${nextQuestionContent}&next-question-theme=${nextQuestionTheme}&previous-question-content=${previousQuestionContent}&previous-question-theme=${previousQuestionTheme}`
}

export function getQuestionHrefWithQuery({
    questionHref,
    sectionTitle,
    questionContent,
    questionTheme,
    nextQuestionContent,
    nextQuestionTheme,
    previousQuestionContent,
    previousQuestionTheme,
    nextQuestionId,
    previousQuestionId,
    startQuestionId,
    endQuestionId,
    startSimilarVideoId,
    endSimilarVideoId,
}: QuestionHrefProps) {
    return `${questionHref}${getQuestionQuery({
        sectionTitle,
        questionContent,
        questionTheme,
        nextQuestionContent,
        nextQuestionTheme,
        previousQuestionContent,
        previousQuestionTheme,
        nextQuestionId,
        previousQuestionId,
        startQuestionId,
        endQuestionId,
        startSimilarVideoId,
        endSimilarVideoId,
    })}`
}

export function getQuestionHref({
    sectionHref,
    questionId,
}: {
    sectionHref: string
    questionId: number
}) {
    return `${sectionHref}/question/${questionId}`
}

export function getVideoHrefWithQUery({
    questionHref,
    videoId,
    questionContent,
    questionTheme,
    sectionTitle,
    startQuestionId,
    endQuestionId,
    startSimilarVideoId,
    endSimilarVideoId,
}: VideoHrefProps) {
    return `${questionHref}/video/${videoId}${getQuestionQuery({
        sectionTitle,
        questionContent,
        questionTheme,
        startQuestionId,
        endQuestionId,
        startSimilarVideoId,
        endSimilarVideoId,
    })}`
}
