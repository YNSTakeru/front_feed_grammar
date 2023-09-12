'use client'

import { getWindowSize } from '@/hooks/get-window.size'
import Theme from '@/themes/light'
import { ThemeProvider, styled } from 'styled-components'

function SDiv({ children }: { children: React.ReactNode }) {
    return <div className="section__list__div">{children}</div>
}

function SPadding({ children }: { children: React.ReactNode }) {
    return <div className="section__list__padding">{children}</div>
}

const SMain = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 120px;
    justify-content: start;
    align-items: center;
    white-space: nowrap;
    height: calc(100vh - 136px);
    width: 100vw;

    @media (min-width: 768px) {
        height: ${({ theme }) => `calc(100vh - ${theme.headerHeight})`};
        width: 75vw;
        justify-content: center;
        padding-top: 0;
    }
`

export default function SectionPage() {
    const { width } = getWindowSize()

    if (!width) return <></>

    return (
        <ThemeProvider theme={Theme}>
            <SDiv>
                <SMain>
                    <SPadding>問題一覧ページ</SPadding>
                    {width > 896 ? (
                        <div>左メニューから問題へジャンプ</div>
                    ) : (
                        <div>単元一覧メニューをタップすると問題一覧を表示</div>
                    )}
                </SMain>
            </SDiv>
        </ThemeProvider>
    )
}
