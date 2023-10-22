'use client'

import useStore from '@/store'
import Link from 'next/link'
import { useEffect } from 'react'
import { styled } from 'styled-components'

const CustomLink = ({
    id,
    title,
    onClick,
}: {
    id: number
    title: string
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}) => (
    <Link onClick={onClick} href={`/section-list/${+id}?title=${title}`}>
        {title}
    </Link>
)

const ULi = styled.li`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    padding: 8px 16px;
    padding-left: 32px;

    &:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    @media (min-width: 768px) {
        border: none;
        padding: 0px;

        &:last-child {
            border-bottom: none;
        }
    }
`

export default function SectionList({
    sectionList,
    clickHandler,
}: {
    sectionList: {
        id: number
        title: string
        created_at: string
        updated_at: string
    }[]
    clickHandler?: () => void
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
                    <Link
                        onClick={clickHandler}
                        href={`/section-list/${id}?title=${title}`}>
                        {title}
                    </Link>
                </ULi>
            ))}
        </>
    )
}
