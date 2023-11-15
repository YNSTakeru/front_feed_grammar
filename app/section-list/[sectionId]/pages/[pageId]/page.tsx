/* eslint-disable */

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"

import FetchQuestionList from "@/components/fetch-question-list"
import SectionDetailTitle from "@/components/section-detail/section-title"
import Spinner from "@/components/spinner"
import { SectionDetailPageProps } from "@/types/pages"
import Link from "next/link"
import { Suspense } from "react"

function SSectionDetailPageWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="section__detail__page__wrapper">{children}</div>
}

function SArrowUturnLeftIcon() {
    return (
        <ArrowUturnLeftIcon className="section__detail__page__arrow__utern__left__icon" />
    )
}

function SUl({ children }: { children: React.ReactNode }) {
    return <ul className="section__detail__page__ul">{children}</ul>
}

export default async function SectionDetailPage({
    params,
}: SectionDetailPageProps) {
    const { sectionId, pageId } = params

    return (
        <SSectionDetailPageWrapper>
            <SectionDetailTitle />
            <SUl>
                <Suspense fallback={<Spinner color="rgb(16,185,129)" />}>
                    {/* @ts-ignore */}
                    <FetchQuestionList sectionId={+sectionId} pageId={pageId} />
                </Suspense>
            </SUl>
            <Link href={`/section-list`}>
                <SArrowUturnLeftIcon />
            </Link>
        </SSectionDetailPageWrapper>
    )
}
