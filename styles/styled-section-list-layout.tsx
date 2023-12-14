import { css } from "styled-components"

export const SSectionListLayout = css`
    .section__list__layout {
        &__section {
            display: flex;
            flex-direction: column;

            @media (min-width: 768px) {
                flex-direction: row;
            }
        }

        &__aside {
            display: block;
            height: initial;
            width: fit-content;
            padding: 8px;
            transition: width 0.3s ease;

            background-color: ${({ theme }) => theme.asideBackgroundColor};

            @media (min-width: 768px) {
                width: 25%;
                padding-top: 60px;
                min-height: ${({ theme }) =>
                    `calc(100vh - ${theme.headerHeight})`};
            }
        }

        &__div {
            width: 100vw;
            height: 100vh;
            display: block;

            @media (min-width: 768px) {
                display: flex;
                justify-content: center;
            }
        }
        &__main {
            height: calc(100vh - 136px);
            display: flex;

            @media (min-width: 768px) {
                flex: 1 1 0%;
                justify-content: center;
            }
        }
    }
`
