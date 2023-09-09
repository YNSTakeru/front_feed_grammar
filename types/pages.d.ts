export type SectionDetailPageProps = {
    params: {
        sectionId: string
    }
}

export type QuestionDetailPageProps = {
    params: {
        questionId: string
        sectionId: string
    }
}

export type SimilarQuestionDetailPageProps = {
    params: {
        videoId: string
        questionId: string
        sectionId: string
    }
}
