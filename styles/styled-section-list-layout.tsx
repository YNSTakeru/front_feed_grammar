import { css } from 'styled-components'

export const SSectionListLayout = css`
    .section__list__layout {
        &__section {
            display: flex;
        }
        &__aside {
            display: none;

            @media (min-width: 768px) {
                display: block;
                height: initial;
                width: 25%;
                background-color: ${({ theme }) => theme.asideBackgroundColor};
                padding: 8px;
                min-height: ${({ theme }) =>
                    `calc(100vh - ${theme.headerHeight})`};
            }
        }
        &__div {
            display: flex;
            justify-content: center;
        }
        &__main {
            display: flex;
            flex: 1 1 0%;
            justify-content: center;
        }
    }
`
