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
            <head>
                <script
                    async
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
                    crossOrigin="anonymous"></script>
            </head>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <Header />
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
