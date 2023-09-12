// Todo クライアントコンポーネントにできる、styled_componentsに切り替える
'use client'

import { getWindowSize } from '@/hooks/get-window.size'
import { Section } from '@/types/database/tables'
import SectionList from './section-list'

function SDiv({ children }: { children: React.ReactNode }) {
    return <div className="section__list__div">{children}</div>
}

function SPadding({ children }: { children: React.ReactNode }) {
    return <div className="section__list__padding">{children}</div>
}

function SUl({ children }: { children: React.ReactNode }) {
    return <ul className="section__list__ul">{children}</ul>
}

export default function FetchSectionList({
    sectionList,
}: {
    sectionList: Section[]
}) {
    // Todo styled-componentsでtransitionさせる
    const { width } = getWindowSize()
    return (
        <>
            {width <= 896 ? (
                <></>
            ) : (
                <SDiv>
                    <SPadding>単元一覧</SPadding>
                    <SUl>
                        <SectionList sectionList={sectionList} />
                    </SUl>
                </SDiv>
            )}
        </>
    )
}
