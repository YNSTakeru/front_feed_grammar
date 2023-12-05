/* eslint-disable */

import GoogleAnalytics from "@/components/GoogleAnalytics"
import Footer from "@/components/footer"
import GlobalStyle from "@/components/global-style"
import Header from "@/components/header"
import StyledComponentsRegistry from "@/lib/styled-components/registry"

const siteName = "Feed Grammar"
const description = "YouTubeの動画を使って英語をリスニングするサイトです。"

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
                <GoogleAnalytics />
                <meta
                    name="google-adsense-account"
                    content="ca-pub-7441958759299413"
                />
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
                    <Footer />
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
