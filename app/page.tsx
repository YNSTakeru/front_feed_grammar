/* eslint-disable */

"use client"

import { getWindowSize } from "@/hooks/get-window.size"
import Theme from "@/themes/light"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeProvider, styled } from "styled-components"

const CustomMainWrapper = ({
    children,
    width,
    ...props
}: {
    children: React.ReactNode
    width: number
}) => <div {...props}>{children}</div>

const SMainWrapper = styled(CustomMainWrapper)`
    padding: 16px;
    width: 100vw;
    height: ${({ theme }) => `calc(100vh - 40px - ${theme.headerHeight})`};
    display: flex;
    justify-content: center;
    opacity: ${({ width }) => (width ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
`

const SMain = styled.main`
    padding: 16px;
    max-width: 665px;
    height: ${({ theme }) => `calc(100vh - ${theme.headerHeight})`};
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: 4.903vw;
`

const STitle = styled.div`
    font-size: xxx-large;
    font-weight: 300;
    align-self: center;
    justify-content: center;

    @media (min-width: 768px) {
        font-size: 4.903vw;
    }
`

const SLogo = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 20%;
    justify-self: start;
    align-self: start;
`

const CustomImage = ({
    src,
    isMobile,
    ...props
}: {
    src: string
    isMobile?: boolean
    alt: string
}) => {
    return (
        <div
            style={{
                position: "relative",
                width: `${isMobile ? "7em" : "10vw"}`,
                height: `${isMobile ? "7em" : "10vw"}`,
            }}>
            <Image src={src} fill {...props} />
        </div>
    )
}

const SImg = styled(CustomImage)``

const SContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: start;

    @media (min-width: 768px) {
    }
`

const SH1 = styled.h1`
    font-size: 20px;
    line-height: 1.42857143;
    width: 100%;
`

const CustomButton = ({
    children,
    ...props
}: {
    children: React.ReactNode
}) => (
    <Link href={"section-list"} {...props}>
        <span className="hovering">Let's play</span>
        <span className="default">プレイする</span>
    </Link>
)

const SButton = styled(CustomButton)`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;

    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    perspective: 300px;
    width: 220px;
    height: 60px;
    font-size: 32px;
    font-weight: 300;
    margin: 0 auto;
    cursor: pointer;

    & span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid black;
        line-height: 58px;
        text-align: center;
        transition: all 0.3s;
    }

    & .hovering {
        background-color: black;
        color: white;
        transform: rotateX(90deg);
        transform-origin: center center -30px;
    }

    & .default {
        background-color: white;
        color: black;
        transform: rotateX(0);
        transform-origin: center center -30px;
    }

    &:hover {
        & .hovering {
            transform: rotateX(0);
        }
        & .default {
            transform: rotateX(-90deg);
        }
    }
`

export default function Home() {
    const [imgProps, setImgProps] = useState({ width: 0, height: 0 })
    const imgPercent = 0.090903
    const [isMobile, setIsMobile] = useState(false)
    const { height, width } = getWindowSize()

    useEffect(() => {
        setImgProps(prev => ({
            width: window.innerWidth * imgPercent,
            height: window.innerWidth * imgPercent,
        }))
    }, [])

    return (
        <ThemeProvider theme={Theme}>
            <SMainWrapper width={width}>
                {width ? (
                    <SMain>
                        <SLogo>
                            <SContainer>
                                <STitle>Feed</STitle>
                                <SImg
                                    src="/logo.svg"
                                    isMobile={width > 896 ? false : true}
                                    alt="ロゴ"
                                />
                            </SContainer>
                            <STitle>Grammar</STitle>
                        </SLogo>
                        <SH1>
                            YouTubeを使って英語耳を鍛えましょう。Feed
                            Grammarは、実際の人々の話し方や文脈であなたの英語のイメージと実際の英語のギャップを縮めます。
                        </SH1>
                        <SButton>プレイする</SButton>
                    </SMain>
                ) : (
                    <></>
                )}
            </SMainWrapper>
        </ThemeProvider>
    )
}
