'use client'

import Theme from '@/themes/light'
import { ThemeProvider, styled } from 'styled-components'

function SDiv({ children }: { children: React.ReactNode }) {
    return <div className="section__list__div">{children}</div>
}

function SPadding({ children }: { children: React.ReactNode }) {
    return <div className="section__list__padding">{children}</div>
}

const SMain = styled.div`
    width: 75vw;
    height: ${({ theme }) => `calc(100vh - ${theme.headerHeight})`};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    white-space: nowrap;
`

export default function SectionPage() {
    return (
        <ThemeProvider theme={Theme}>
            <SDiv>
                <SMain>
                    <SPadding>問題一覧ページ</SPadding>
                    <div>左メニューから問題へジャンプ</div>
                </SMain>
            </SDiv>
        </ThemeProvider>
    )
}
