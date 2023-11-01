'use client'

import Theme from '@/themes/light'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ThemeProvider, styled } from 'styled-components'

const CustomNav = ({
    width,
    children,
    ...props
}: {
    width: number
    children: React.ReactNode
}) => <nav {...props}>{children}</nav>

const SNav = styled(CustomNav)`
    font-size: 14px;
    padding: 32px 0 22px 0;
    padding-left: 20px;
    width: ${({ width }) => `${width}px`};

    @media (min-width: 768px) {
        padding-left: 0;
    }
`

const SUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
`

const CustomLi = ({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) => {
    return <li className={className + ' breadcrumb__item'}>{children}</li>
}

const CustomLink = ({
    href,
    children,
    ...props
}: {
    href: string
    children: React.ReactNode
}) => {
    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    )
}

const SLink = styled(Link)`
    text-decoration-color: rgb(34, 34, 34);
    text-decoration-line: underline;
    transition: all 0.3s;

    &:hover {
        color: ${({ theme }) => theme.hoverColor};
    }
`

const SLi = styled(CustomLi)`
    & + .breadcrumb__item {
        padding-left: 0.5rem;

        &::before {
            content: ' > ';
            display: inline-block;
            padding-right: 0.5rem;
            color: #6c757d;
        }
    }
`

export default function BreadcrumbsList({
    contents,
    width,
}: {
    contents: any[]
    width: number
}) {
    const [stateWidth, setWidth] = useState(width)

    useEffect(() => {
        setWidth(prev => window.innerWidth * 0.5 - 15)
    }, [window.innerWidth])

    return (
        <ThemeProvider theme={Theme}>
            <SNav width={width}>
                <SUl>
                    {contents.map(({ href, content }, i) => (
                        <SLi key={i}>
                            {href ? (
                                <SLink href={href}>{content}</SLink>
                            ) : (
                                <>{content}</>
                            )}
                        </SLi>
                    ))}
                </SUl>
            </SNav>
        </ThemeProvider>
    )
}
