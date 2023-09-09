'use client'

import useStore from '@/store'
import { Section } from '@/types/database/tables'
import Link from 'next/link'
import { useEffect } from 'react'
import { styled } from 'styled-components'

const ULi = styled.li`
    display: flex;
    justify-content: space-between;
`

function setSectionListToStore({
    sectionListFromServer,
    sectionListFromStore,
}: {
    sectionListFromServer: Section[]
    sectionListFromStore: Section[]
}) {
    if (sectionListFromStore) return

    useStore.setState(state => ({
        sectionList: [...sectionListFromServer],
    }))
}

export default function SectionList({
    sectionList,
}: {
    sectionList: Section[]
}) {
    let storeSectionList = useStore.getState().sectionList

    useEffect(() => {
        if (storeSectionList.length != 0) return

        useStore.setState({
            sectionList: [...sectionList],
        })
        storeSectionList = useStore.getState().sectionList
    }, [])

    return (
        <>
            {sectionList.map(({ id, title }) => (
                <ULi key={id}>
                    <Link href={`/section-list/${id}?title=${title}`}>
                        {title}
                    </Link>
                </ULi>
            ))}
        </>
    )
}
