import { css } from 'styled-components'

export const SProgressBar = css`
    .progress__bar {
        width: 100%;
        height: 50px;
        position: relative;
        overflow: hidden;
        z-index: 1;

        & .before {
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: #5dc65d;
            position: absolute;
            transform: translateX(-100%);
            top: 0;
            left: 0;
            z-index: -1;
        }
    }
`
