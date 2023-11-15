"use client"

import { getUrlQuery } from "@/lib/url-query"
import { styled } from "styled-components"

const SParagraph = styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default function SectionDetailTitle() {
    const title = getUrlQuery("title")

    return <SParagraph>{title}</SParagraph>
}
