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
