import { css } from 'styled-components'

export const SSectionList = css`
    .section__list {
        &__div {
            padding: 16px;
        }
        &__padding {
            margin-bottom: 12px;
            padding-bottom: 12px;
            font-size: 1.25rem;
            line-height: 1.75rem;
            text-decoration: underline;
            text-underline-offset: 4px;
        }

        &__li {
            margin: 4px 0;
            font-size: 1rem;
            line-height: 1.5rem;

            & a {
                color: #8a8aff;
            }
        }

        &__ul {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }
`
