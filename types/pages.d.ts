export type SectionDetailPageProps = {
    params: {
        sectionId: string
        pageId: string
    }
}

export type QuestionDetailPageProps = {
    params: {
        questionId: string
        sectionId: string
        pageId: string
    }
}

export type SimilarQuestionDetailPageProps = {
    params: {
        videoId: string
        questionId: string
        sectionId: string
    }
}
