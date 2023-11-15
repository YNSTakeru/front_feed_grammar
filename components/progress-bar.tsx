/* eslint-disable */

"use client"

import { styled } from "styled-components"

type CustomDivProps = {
    className?: string
}

const CustomDiv = ({ className, ...props }: CustomDivProps) => (
    <div className={`progress__bar ${className}`} {...props}>
        <div className="before"></div>
    </div>
)

const SDiv = styled(CustomDiv)``

export default function ProgressBar({
    startTime,
    endTime,
}: {
    startTime: number
    endTime: number
}) {
    return <SDiv></SDiv>
}
