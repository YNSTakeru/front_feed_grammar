'use client'
import { useSearchParams } from 'next/navigation'

export function getUrlQuery(title: string) {
    const searchParams = useSearchParams()
    return searchParams!.get(title)
}
