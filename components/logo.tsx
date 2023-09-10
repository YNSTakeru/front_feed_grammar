'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const SLogoWrapper = styled.div`
    --bg-gray-700: rgba(55, 65, 81, 1);
    font-size: 32px;
    font-weight: 700;
    white-space: nowrap;
    color: ${({ theme }) => theme.secondaryColor};
    padding: 8px;
`

const SLogoLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
        font-size: x-large;
    }

    @media (min-width: 768px) {
        gap: 16px;

        & span {
            font-size: 32px;
        }
    }
`

const CustomImage = ({
    hover,
    ...props
}: {
    hover: boolean
    src: string
    alt: string
    width: number
    height: number
}) => {
    return <Image {...props} />
}

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const SLogo = styled(CustomImage)`
    margin-right: 4px;
    animation: ${rotation} 1s linear infinite;
    animation-play-state: paused;

    ${({ hover }) =>
        hover &&
        css`
            animation-play-state: running;
        `}

    @media (min-width: 768px) {
        margin-right: 16px;
    }
`

export function Logo({
    src = '/logo.svg',
    title = 'Feed Grammar (β)',
}: {
    src?: string
    title?: string
}) {
    const [hover, setHover] = useState(false)

    return (
        <SLogoWrapper
            onMouseEnter={() => {
                setHover(true)
            }}
            onMouseLeave={() => {
                setHover(false)
            }}>
            <SLogoLink href="/">
                <SLogo
                    hover={hover}
                    src={src}
                    alt="ロゴ"
                    width={60}
                    height={60}
                />
                <span>{title}</span>
            </SLogoLink>
        </SLogoWrapper>
    )
}
