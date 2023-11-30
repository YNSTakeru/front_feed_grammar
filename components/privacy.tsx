/* eslint-disable */

"use client"
import Theme from "@/themes/light"
import styled, { ThemeProvider } from "styled-components"

const SMain = styled.main`
    background-color: #eaf6ea;
    width: 100vw;
    min-height: ${({ theme }) => `calc(100vh - 40px - ${theme.headerHeight})`};
    display: flex;
    justify-content: center;
    align-items: center;
`

const SContent = styled.div`
    width: 700px;
    background-color: white;
    border-radius: 20px;
    padding: 50px;
`

const STitle = styled.div`
    line-height: 20px;
    padding: 6px;
    border: solid 6px silver;
    border-top: none;
    border-right: none;
    border-left-width: 10px;
`
const SBody = styled.div`
    line-height: 20px;
    padding: 6px;
`

export default function Privacy() {
    return (
        <ThemeProvider theme={Theme}>
            <SMain>
                <SContent>
                    <STitle>当サイトについて</STitle>
                    <SBody>
                        「Feed
                        Grammar」は管理人が趣味で運営する、英語学習者向けの問題集個人サイトです。以降このページ内の「Feed
                        Grammarのコンテンツ」という表現は、運営者が作成したサイト内の全てのコンテンツを指すものとします。また、このページの内容は追記・変更される可能性があります。
                    </SBody>
                    <STitle>ご利用規約</STitle>
                </SContent>
            </SMain>
        </ThemeProvider>
    )
}
