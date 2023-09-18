import { Question, Section, Url, Video, Word } from '@/types/database/tables'
import { getRandomValueFromArray } from './array'

async function fetchISR(url: string) {
    const res = await fetch(url, { next: { revalidate: 10 } })

    if (!res.ok) throw new Error('サーバーからデータの取得に失敗しました。')

    return res
}

export async function fetchSectionList(pageNum = 1) {
    const res = await fetchISR(
        `${process.env.URL}/api/sections?page=${pageNum}`,
    )
    const sectionList: Section[] = await res.json()
    return sectionList
}

export async function fetchQuestionList(sectionId: number) {
    const res = await fetchISR(`${process.env.URL}/api/sections/${sectionId}`)
    const resJson = await res.json()

    const questionList: Question[] = resJson.questions
    return questionList
}

export async function fetchNextQuestion({
    sectionId,
    questionId,
}: {
    sectionId: number
    questionId: number
}) {
    const res = await fetchISR(
        `${process.env.URL}/sections/${sectionId}/questions/${questionId}/next`,
    )

    const resJson = await res.json()

    const question: Question = resJson.question
    return question
}

export async function fetchPreviousQuestion({
    sectionId,
    questionId,
}: {
    sectionId: number
    questionId: number
}) {
    const res = await fetchISR(
        `${process.env.URL}/sections/${sectionId}/questions/${questionId}/previous`,
    )

    const resJson = await res.json()

    const question: Question = resJson.question
    return question
}

export async function fetchQuestionDetail(questionId: number) {
    const urls = await fetchUrls(questionId)
    const { url, id } = getRandomValueFromArray(urls)
    const urlId = id
    const video = await fetchVideo(urlId)
    const videoId = video.id
    const words = await fetchWords(videoId)

    return { video, url, words }
}

async function fetchUrls(questionId: number) {
    const res = await fetchISR(`${process.env.URL}/questions/${questionId}`)

    const resJson = await res.json()

    const urls: Url[] = resJson.urls

    return urls
}

export async function fetchVideos(questionId: number) {
    const res = await fetchISR(`${process.env.URL}/questions/${questionId}`)

    const resJson = await res.json()

    const video: Video[] = resJson.videos

    return video
}

async function fetchVideo(urlId: number) {
    const res = await fetchISR(`${process.env.URL}/urls/${urlId}`)

    const resJson = await res.json()

    const video: Video = resJson.video

    return video
}

export async function fetchNextVideo({
    questionId,
    videoId,
}: {
    questionId: number
    videoId: number
}) {
    const res = await fetchISR(
        `${process.env.URL}/questions/${questionId}/videos/${videoId}/next`,
    )

    const resJson = await res.json()

    const video: Video = resJson.video

    return video
}

export async function fetchPreviousVideo({
    questionId,
    videoId,
}: {
    questionId: number
    videoId: number
}) {
    const res = await fetchISR(
        `${process.env.URL}/questions/${questionId}/videos/${videoId}/previous`,
    )

    const resJson = await res.json()

    const video: Video = resJson.video

    return video
}

async function fetchWords(videoId: number) {
    const res = await fetchISR(`${process.env.URL}/words/${videoId}`)

    const resJson = await res.json()

    const words: Word[] = resJson.words

    return words
}
