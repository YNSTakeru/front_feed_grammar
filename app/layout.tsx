/* eslint-disable */

import GlobalStyle from "@/components/global-style"
import Header from "@/components/header"
import StyledComponentsRegistry from "@/lib/styled-components/registry"

const siteName = "Feed Grammar"
const description = "英文法を勉強するサイトです"

export const metadata = {
    title: {
        default: siteName,
        template: `%s - ${siteName}`,
    },
    description,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body>
                <StyledComponentsRegistry>
                    <body>
                        <GlobalStyle />
                        <Header />
                        {children}
                    </body>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
