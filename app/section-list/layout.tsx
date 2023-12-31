/* eslint-disable */

import SectionListAside from "@/components/section-list-aside"
import { fetchSectionListData } from "@/lib/fetchData"
import React from "react"

function SSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="section__list__layout__section">{children}</section>
    )
}

function SAside({ children }: { children: React.ReactNode }) {
    return <aside className="section__list__layout__aside">{children}</aside>
}

function SMain({ children }: { children: React.ReactNode }) {
    return <main className="section__list__layout__main">{children}</main>
}

export default async function SectionLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const sectionListData = await fetchSectionListData()

    return (
        <SSection>
            <SAside>
                <SectionListAside sectionListData={sectionListData} />
            </SAside>
            <SMain>{children}</SMain>
        </SSection>
    )
}
