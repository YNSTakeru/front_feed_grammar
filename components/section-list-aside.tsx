// Todo クライアントコンポーネントにできる、styled_componentsに切り替える
'use client'
import { getWindowSize } from '@/hooks/get-window.size'
import Theme from '@/themes/light'
import { SectionCollection } from '@/types/database/tables'
import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import SectionList from './section-list'
import Spinner from './spinner'

const CustomDiv = ({
    isOpen,
    children,
    ...props
}: {
    isOpen?: boolean
    children: React.ReactNode
}) => <div {...props}>{children}</div>

const SDiv = styled(CustomDiv)`
    padding: 16px;
    height: 60px;
    max-height: 60px;
    transition: width 0.3s ease-out;
    width: ${({ isOpen }) => (isOpen ? '100vw' : '35vw')};

    @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

const CustomButton = ({
    isOpen,
    onClick,
    ...props
}: {
    isOpen?: boolean
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => (
    <button onClick={onClick} {...props}>
        {!isOpen ? '単元一覧メニュー' : '単元一覧メニュー(閉じる)'}
    </button>
)

const SButton = styled(CustomButton)`
    border: none;
    outline: none !important;
    font-weight: bold;
    background-color: transparent;
`

const CustomMobileSectionListMenu = ({
    isOpen,
    children,
    ...props
}: {
    isOpen: boolean
    children: React.ReactNode
}) => <ul {...props}>{children}</ul>

const SMobileSectionListMenu = styled(CustomMobileSectionListMenu)`
    position: absolute;
    top: 136px;
    left: -100%;
    width: 100vw;
    height: calc(100vh - 136px);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    z-index: 6;

    background-color: ${({ theme }) => theme.asideBackgroundColor};

    transform: ${({ isOpen }) => (isOpen ? 'translateX(100vw)' : 'none')};
`

function SPadding({ children }: { children: React.ReactNode }) {
    return <div className="section__list__padding">{children}</div>
}

function SUl({ children }: { children: React.ReactNode }) {
    return <ul className="section__list__ul">{children}</ul>
}

export default function SectionListAside({
    sectionListData,
}: {
    sectionListData: SectionCollection
}) {
    const { width } = getWindowSize()
    const [isOpen, setIsOpen] = useState(false)
    const clickHandler = () => {
        setIsOpen(prev => !prev)
    }
    const sectionList = sectionListData.data

    if (!width) return <Spinner></Spinner>

    return (
        <ThemeProvider theme={{ ...Theme }}>
            {width <= 896 ? (
                <>
                    <SDiv isOpen={isOpen}>
                        <SButton onClick={clickHandler} isOpen={isOpen} />
                    </SDiv>
                    <SMobileSectionListMenu isOpen={isOpen}>
                        <SectionList
                            sectionList={sectionList}
                            clickHandler={clickHandler}
                        />
                    </SMobileSectionListMenu>
                </>
            ) : (
                <SDiv>
                    <SPadding>単元一覧</SPadding>
                    <SUl>
                        <SectionList sectionList={sectionList} />
                    </SUl>
                </SDiv>
            )}
        </ThemeProvider>
    )
}
