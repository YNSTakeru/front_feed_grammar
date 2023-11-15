/* eslint-disable */

"use client"

import styled from "styled-components"

const SDivWrapper = styled.div`
    margin: 64px;
    display: flex;
    justify-content: center;
`

const CustomDiv = ({ color, ...props }: { color: string }) => {
    return <div {...props} />
}

const SDiv = styled(CustomDiv)`
    height: 40px;
    width: 40px;
    border-radius: 9999px;
    border: 4px solid ${({ color }) => color};
    border-top-color: transparent;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    animation: spin 1s linear infinite;
`

export default function Spinner({
    color = "rgb(59, 130, 246)",
}: {
    color?: string
}) {
    return (
        <SDivWrapper>
            <SDiv color={color} />
        </SDivWrapper>
    )
}
