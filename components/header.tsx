'use client'

import Theme from '@/themes/light'
import { ThemeProvider, styled } from 'styled-components'
import { Logo } from './logo'
import NavBar from './nav-bar'

const SHeader = styled.header`
    height: ${({ theme }) => theme.headerHeight};
    width: 100%;
    display: flex;
    padding: 0 24px;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.asideBackgroundColor};
`

export default function Header() {
    return (
        <ThemeProvider theme={{ ...Theme }}>
            <SHeader>
                <Logo />
                <NavBar />
            </SHeader>
        </ThemeProvider>
    )
}
