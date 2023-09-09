import { css } from 'styled-components'

export const SSectionDetailPage = css`
    .section__detail__page {
        &__wrapper {
            height: max-content;
            margin-top: 64px;
            border: gray solid 2px;
            padding: 24px;

            @media (min-width: 896px) {
                margin-top: 32px;
            }
        }
        &__arrow__utern__left__icon {
            margin-top: 12px;
            height: 24px;
            width: 24px;
            cursor: pointer;
            color: rgb(59, 130, 246);
        }
        &__ul {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-block: 16px;
        }
        &__p {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
`
