'use client'

import Theme from '@/themes/light'
import { ThemeProvider, styled } from 'styled-components'
import { Logo } from './logo'
import NavBar from './nav-bar'

const SHeader = styled.header`
    height: ${({ theme }) => theme.headerHeight};
    width: 100%;
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.asideBackgroundColor};
    position: relative;

    @media (min-width: 768px) {
        padding: 0 24px;
    }
`

export default function Header() {
    // function disableScroll(event: MouseEvent | TouchEvent) {
    //     event.preventDefault()
    // }
    // useEffect(() => {
    //     document.addEventListener('touchmove', disableScroll, {
    //         passive: false,
    //     })
    // }, [])

    return (
        <ThemeProvider theme={{ ...Theme }}>
            <SHeader>
                <Logo />
                <NavBar />
            </SHeader>
        </ThemeProvider>
    )
}
