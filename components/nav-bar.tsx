import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styled, { css } from 'styled-components'

const CustomMobileMenuItem = ({
    children,
    isMenuOpen,
    ...props
}: {
    children: React.ReactNode
    isMenuOpen: boolean
}) => <li {...props}>{children}</li>

const SMobileMenuItem = styled(CustomMobileMenuItem)`
    padding: 0 40px;
    transition: transform 0.3s, opacity 0.2s ease-in-out;

    ${({ isMenuOpen }) => {
        let styles = ''
        for (let i = 1; i < 3; i++) {
            styles += `
                &:nth-child(${i}) {
                    transition-delay: ${i * 0.15}s;
                }
            `
        }
        return isMenuOpen
            ? css`
                  transform: none;
                  opacity: 1;
                  ${styles}
              `
            : css`
                  opacity: 0;
              `
    }}
`

const CustomMobileMenuIcon = ({
    children,
    isMenuOpen,
    onClick,
    ...props
}: {
    children: React.ReactNode
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    isMenuOpen: boolean
}) => (
    <button className="mobile-menu-icon" onClick={onClick} {...props}>
        {children}
    </button>
)

const CustomCover = ({
    children,
    isMenuOpen,
    onClick,
    ...props
}: {
    children?: React.ReactNode
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
    isMenuOpen: boolean
}) => (
    <div onClick={onClick} {...props}>
        {children}
    </div>
)

const SCover = styled(CustomCover)`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: -100vh;
    left: 0;
    z-index: 9;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
    transform: ${({ isMenuOpen }) =>
        isMenuOpen ? 'translateY(100vh)' : 'none'};
`

const MobileMenuIcon = styled(CustomMobileMenuIcon)`
    background-color: transparent;
    border: none;
    outline: none !important;
    padding: 0 24px;
    z-index: 100;

    & > span {
        background-color: black;
        background-color: ${({ isMenuOpen }) =>
            isMenuOpen ? 'white' : 'black'};
        width: 35px;
        height: 2px;
        display: block;
        margin-bottom: 9px;
        transition: transform 0.3s;

        &:nth-child(1) {
            transition-delay: ${({ isMenuOpen }) =>
                isMenuOpen ? '70ms' : 'none'};
            transform: ${({ isMenuOpen }) =>
                isMenuOpen ? 'translateY(11px) rotate(135deg)' : 'none'};
        }
        &:nth-child(2) {
            transition-delay: ${({ isMenuOpen }) =>
                isMenuOpen ? '0s' : 'none'};
            transform: ${({ isMenuOpen }) =>
                isMenuOpen ? 'translateX(-18px) scaleX(0)' : 'none'};
        }
        &:nth-child(3) {
            transition-delay: ${({ isMenuOpen }) =>
                isMenuOpen ? '140ms' : 'none'};
            transform: ${({ isMenuOpen }) =>
                isMenuOpen ? 'translateY(-11px) rotate(-135deg)' : 'none'};
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    @media (min-width: 768px) {
        display: none;
    }
`

const CustomMenu = ({
    children,
    isMenuOpen,
    onClick,
    ...props
}: {
    children: React.ReactNode
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
    isMenuOpen: boolean
}) => (
    <nav className="menu" onClick={onClick} {...props}>
        {children}
    </nav>
)

const SMenu = styled(CustomMenu)`
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 40px;
    top: 0;
    left: 100%;
    padding-top: 60px;
    z-index: 10;
    transform: ${({ isMenuOpen }) =>
        isMenuOpen ? 'translateX(-60%)' : 'none'};

    background-color: rgba(0, 0, 0, 0.7);
    transition: transform 0.3s ease-in-out;

    @media (min-width: 768px) {
        display: none;
    }
`

const SNav = styled.nav`
    display: none;

    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
`

const CustomLink = ({
    isActive,
    children,
    isMobileMenu,
    ...props
}: {
    isActive: boolean
    children: React.ReactNode
    href: string
    isMobileMenu?: boolean
}) => <Link {...props}>{children}</Link>

const SLink = styled(CustomLink)`
    border-radius: 9999999;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    color: ${({ theme, isMobileMenu }) =>
        isMobileMenu ? 'white' : theme.bodyFontColor};
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
        opacity: 0.7;
    }

    ${({ isMobileMenu }) =>
        isMobileMenu
            ? css`
                  font-weight: 600;
                  font-size: 25px;
              `
            : css``}
`

export default function NavBar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const clickHandler = () => {
        setIsMenuOpen(prev => !prev)
        console.log('押された')
    }
    return (
        <>
            <MobileMenuIcon onClick={clickHandler} isMenuOpen={isMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
            </MobileMenuIcon>
            <SMenu isMenuOpen={isMenuOpen} onClick={clickHandler}>
                <SMobileMenuItem isMenuOpen={isMenuOpen}>
                    <SLink
                        isMobileMenu
                        isActive={pathname === 'section-list'}
                        href="/section-list">
                        単元一覧
                    </SLink>
                </SMobileMenuItem>
                <SMobileMenuItem isMenuOpen={isMenuOpen}>
                    <SLink
                        isMobileMenu
                        isActive={pathname === 'contact'}
                        href="/contact">
                        お問い合わせ
                    </SLink>
                </SMobileMenuItem>
            </SMenu>
            <SCover isMenuOpen={isMenuOpen} onClick={clickHandler} />
            <SNav>
                <SLink
                    isActive={pathname === 'section-list'}
                    href="/section-list">
                    単元一覧
                </SLink>
                <SLink isActive={pathname === 'contact'} href="/contact">
                    お問い合わせ
                </SLink>
            </SNav>
        </>
    )
}
