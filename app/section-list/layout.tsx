import FetchSectionList from '@/components/fetch-section-list'
import React from 'react'

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

export default function SectionLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SSection>
            <SAside>
                {/*@ts-ignore*/}
                <FetchSectionList />
            </SAside>
            <SMain>{children}</SMain>
        </SSection>
    )
}
