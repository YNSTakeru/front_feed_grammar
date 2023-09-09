import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

const SNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`

const CustomLink = ({
    isActive,
    children,
    ...props
}: {
    isActive: boolean
    children: React.ReactNode
    href: string
}) => <Link {...props}>{children}</Link>

const SLink = styled(CustomLink)`
    border-radius: 9999999;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    color: ${({ theme }) => theme.bodyFontColor};
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
        opacity: 0.7;
    }
`

export default function NavBar() {
    const pathname = usePathname()

    return (
        <SNav>
            <SLink isActive={pathname === 'section-list'} href="/section-list">
                単元一覧
            </SLink>
            <SLink isActive={pathname === 'contact'} href="/contact">
                お問い合わせ
            </SLink>
        </SNav>
    )
}
