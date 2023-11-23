/* eslint-disable */

import {
    QuestionCollection,
    QuestionLink,
    SectionCollection,
    Video,
} from "@/types/database/tables"

async function fetchISR(url: string) {
    const res = await fetch(url, { next: { revalidate: 10 } })

    if (!res.ok) throw new Error("サーバーからデータの取得に失敗しました。")

    return res
}

export async function fetchSectionListData(pageNum = 1) {
    const res = await fetchISR(
        `${process.env.NEXT_PUBLIC_URL}/api/sections?page=${pageNum}`,
    )
    const sectionListData: SectionCollection = await res.json()

    return sectionListData
}

export async function fetchQuestionListData({
    sectionId,
    pageNum = 1,
}: {
    sectionId: number
    pageNum?: number
}) {
    const res = await fetchISR(
        `${process.env.NEXT_PUBLIC_URL}/api/sections/${sectionId}/questions?page=${pageNum}`,
    )
    const questionListData: QuestionCollection = await res.json()

    return questionListData
}

export async function fetchQuestionLink(questionId: number) {
    const res = await fetchISR(
        `${process.env.NEXT_PUBLIC_URL}/api/questions/${questionId}`,
    )
    const questionLink: QuestionLink = await res.json()
    return questionLink
}

export async function fetchVideos({
    questionId,
    pageId = "1",
}: {
    questionId: string
    pageId: string
}) {
    const res = await fetchISR(
        `${process.env.NEXT_PUBLIC_URL}/api/videos?filter[question_id]=${questionId}`,
    )

    const videos: Video[] = (await res.json()).data

    return videos
}
