/* eslint-disable */

"use client"
import Theme from "@/themes/light"
import Link from "next/link"
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

const SBig = styled.div`
    font-weight: bold;
`

const SLink = styled(Link)`
    color: rgb(0, 136, 126);
    text-decoration: underline;
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
                    <SBody>
                        <SBig>
                            下記をお読みになり、全ての内容に同意できる場合のみ、Feed
                            Grammarのコンテンツを閲覧・利用することができます。もし同意できない場合速やかに閲覧を中止してください。
                        </SBig>
                        <br />
                        1.
                        FeedGrammarのコンテンツの利用者(以下ユーザーとする)は、自己の責任において本サイトのコンテンツを利用するものとし、ユーザーが本サイトを利用して行なった全ての行為及びその結果について一切の責任とリスクを負うものとします。
                        <br />
                        <br />
                        2.
                        FeedGrammarのコンテンツを閲覧・利用した事により、ユーザーが何らかの被害・損害を被ったとしても、運営者は一切の責任を負わないものとします。サービスの内容、コンテンツの動作についても一切の保証はなく、いつでもコンテンツの停止、変更、データの削除を行うことができるものとします。
                        <br />
                        <br />
                        3.
                        サーバーに過度な負荷をかけたり、サイト運営の妨げや他のユーザーの迷惑になるような行為、サイトの趣旨に反するような外部ツール、プログラムの使用は禁止します。
                        <br />
                        <br />
                        4.
                        FeedGrammarのコンテンツを許可無く転載、配布、販売、改変、リバースエンジニアリング、二次使用、配信、その他法律によって認められていない行為を禁止します。
                        <br />
                        コンテンツを画面キャプチャしたり、スクリーンショット等の方法で作成した静止画の使用は、法律で認められている範囲内であれば可能です(但し、公序良俗に反するものや、サイト運営に影響を与えるようなものはその限りではありません)
                        <br />
                        <br />
                        5.
                        FeedGrammarのコンテンツを利用して他のユーザーや第三者の著作権、その他の知的財産権を侵害したり、法令に違反および公序良俗に反するような行為を行う事は禁止します。
                        <br />
                        もし上記の行為により、第三者のトラブル・あるいはそられに起因または関連する損害が発生した場合は全て第三者とユーザーとの間で解決するものとし、当サイトは一切の責任を負わないものとします。
                        <br />
                        <br />
                        6.
                        営利目的でFeedGrammarのコンテンツを利用することはできません。
                        <br />
                        コンテンツを利用して有料のイベントや講習等を行なって利益を得たり、プレイ動画の配信等で視聴者から直接利益を得るような行為は固く禁止します。
                        <br />
                        また、FeedGrammarと関係のない第三者が自らの活動の宣伝や広告、営業の為に、FeedGrammarのコンテンツやそのタイトル名、画像、動画等を使用することはできません。
                        <br />
                        <br />
                        7. サイトへのリンクは適切なURLをご利用ください。
                        htmlファイル以外ファイルに直接リンクを貼る事は禁止されています。
                        <br />
                        また、FeedGrammarのサイトがリンク元のサイトの一部であるかのような紛らわしい表記をしたり、訪問者が誤解するような方法でリンクを貼る事はできません。
                        <br />
                        <br />
                    </SBody>
                    <STitle>当サイトのプライバシーポリシー</STitle>
                    ・当サイトでは広告配信の過程で、CookieやWebビーコンと呼ばれる技術おw使って自動的んいユーザーの情報を取得することがあります。(ユーザーの情報とは、IPアドレス、ドメイン名、ブラウザ、OS等の環境、クッキー情報、アクセス履歴などのことであり、この情報から第三者がユーザー個人を特定する事はできません)
                    これらは情報収集の目的で取得されるもので、他の用途に使用されることはありません。
                    <br />
                    <br />
                    ・ユーザーはプライバシー保護のためにCookieを受け入れるかどうかを選択することができます。Cookieの取得を拒否したい場合には、お使いのブラウザのヘルプをご覧になり、Cookieの送受信に関する設定を行なってください。
                    <br />
                    <br />
                    ・当サイトではGoogleなどの第三者配信による広告サービスを利用しています。広告配信事業者はユーザーの興味に応じた内容の広告(パーソナライズ広告)を表示するために、Cookieを使用してサイトや他サイトへのユーザーのアクセスに関する情報を使用することがあります（個人を特定する情報は含まれません）。
                    <br />
                    ユーザーは、
                    <SLink href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings">
                        広告設定
                    </SLink>
                    でパーソナライズ広告を無効にすることができます。
                    <br />
                    また、
                    <SLink href="https://optout.aboutads.info/?c=2&lang=EN">
                        www.aboutads.info
                    </SLink>
                    にアクセスすれば、パーソナライズ広告に使われる第三者配信事業者のCookieを無効にすることができます。
                    <br />
                    <br />
                    ・ユーザーから送られてきたメールについては、ユーザーとの連絡以外の目的に使用したり第三者への開示をすることはありません（＊法律に基づいて開示を求められた場合や警察・裁判所等の公的な期間から開示を求められた場合を除きます）。
                    <STitle>お問い合わせ</STitle>
                    FeedGrammarに関するご質問、不明点などございましたら、
                    <SLink href="/contact">お問い合わせページ</SLink>
                    よりご連絡ください。
                </SContent>
            </SMain>
        </ThemeProvider>
    )
}
