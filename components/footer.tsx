"use client"

import Theme from "@/themes/light"
import Link from "next/link"
import styled, { ThemeProvider } from "styled-components"

const SFooter = styled.footer`
    height: 40px;
    line-height: 19.9px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.asideBackgroundColor};
`

const CustomLink = ({
    children,
    ...props
}: {
    children: React.ReactNode
    href: string
}) => <Link {...props}>{children}</Link>

const SLink = styled(CustomLink)`
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
        opacity: 0.7;
    }
`

export default function Footer() {
    return (
        <ThemeProvider theme={{ ...Theme }}>
            <SFooter>
                <SLink href="/privacy">プライバシーポリシー</SLink>
            </SFooter>
        </ThemeProvider>
    )
}
