type Collection<T> = {
    data: T[]
    links: {
        first: string
        last: string
        prev: string
        next: string
    }
    meta: {
        current_page: number
        from: number
        last_page: number
        links: [[Object], [Object], [Object]]
        path: string
        per_page: number
        to: number
        total: number
    }
}
export type Section = {
    id: number
    title: string
    created_at: string
    updated_at: string
}

export type Question = {
    id: number
    content: string
    theme: string
}

export type SectionCollection = Collection<Section>

export type QuestionCollection = Collection<Question>

export type QuestionLink = {
    previousQuestion: Question
    nextQuestion: Question
}

export type Url = {
    id: number
    url: string
}

export type Video = {
    id: number
    url: string
    answer: string
    start_time: string
    end_time: string
}

export type UrlVideo = {
    id: number
    url: string
    answer: string
    start_time: string
    end_time: string
}

export type Word = {
    id: number
    content: string
}
