'use client'

import '@/css/_app.css'
import { SProgressBar } from '@/styles/styled-progress-bar'
import { SSectionDetailPage } from '@/styles/styled-section-detail-page'
import { SSectionList } from '@/styles/styled-section-list'
import { SSectionListLayout } from '@/styles/styled-section-list-layout'
import Theme from '@/themes/light'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const SGlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        line-height:24px;
    }

  ol, ul{
    padding: 0;
    list-style: none;
  }

  li{
    list-style-type: none;
  }

  a{
    text-decoration: none;
    color: black;
    transition: color 0.3s ease-in-out;

    &:hover{
        color: rgb(100, 100, 100);
    }

    &:active{
        color: black;
    }
  }
  body {
    font-family: 'Kaushan Script', cursive;
    font-family: 'Open Sans', sans-serif;
    overflow: hidden;
  }

  .img {
    &__wrapper{
      position: 'relative';
      height: '10vw';
      width: '10vw';
      background-color:red;
    }
  }

  ${SSectionListLayout}
  ${SSectionList}
  ${SSectionDetailPage}
  ${SProgressBar}
`

export default function GlobalStyle() {
    return (
        <ThemeProvider theme={{ ...Theme }}>
            <SGlobalStyle />
        </ThemeProvider>
    )
}
