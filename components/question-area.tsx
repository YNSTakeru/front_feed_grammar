'use client'

import { shuffle } from '@/lib/array'
import { saveIsSolvedStore, useIsLoadedStore, useIsSolvedStore } from '@/store'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { css, styled } from 'styled-components'

const CustomDiv = ({
    className,
    width,
    children,
    ...props
}: {
    className?: string
    width: number
    children: React.ReactNode
}) => {
    return (
        <section className={`question__area ${className}`} {...props}>
            {children}
        </section>
    )
}

const SSection = styled(CustomDiv)`
    max-width: ${({ width }) => `${width}px`};
`

const CustomUl = ({
    isLoaded,
    children,
    ...props
}: {
    isLoaded: boolean
    children: React.ReactNode
}) => <ul {...props}>{children}</ul>

const SUl = styled(CustomUl)`
    padding: 20px 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
    cursor: ${({ isLoaded }) => (isLoaded ? 'cursor' : 'wait')};
    max-width: 100%;

    @media (min-width: 768px) {
        padding: 20px 0;
    }
`

const CustomAnswerAreaDiv = ({
    customRef,
    children,
    ...props
}: {
    customRef: React.MutableRefObject<HTMLDivElement | null>
    children?: React.ReactNode
}) => (
    <div ref={customRef} {...props}>
        {children}
    </div>
)

const SAnswerArea = styled(CustomAnswerAreaDiv)`
    font-size: 32px;
    font-weight: 500;
    line-height: 1.3;
    min-height: 41.5938px;
    border-bottom: 1px solid;
    padding-left: 20px;
    padding-right: 20px;

    @media (min-width: 768px) {
        padding-left: 0;
        padding-right: 0;
    }
`

const CustomLi = ({
    id,
    className,
    customRef,
    isSolved,
    isLoaded,
    isPressed,
    onClick,
    children,
    ...props
}: {
    id: number
    className?: string
    customRef: (node: HTMLLIElement | null) => void
    isSolved: boolean
    isLoaded: boolean
    isPressed: boolean
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void
    children?: React.ReactNode
}) => (
    <li
        id={`${id}`}
        className={`word__li ${className}`}
        ref={customRef}
        onClick={onClick}
        {...props}>
        {children}
    </li>
)
const SLi = styled(CustomLi)`
    ${({ isSolved, isPressed }) =>
        isSolved || isPressed
            ? css`
                  cursor: initial;
                  box-shadow: none;
                  background-color: #e4e4e4;
              `
            : css`
                  cursor: pointer;
                  transform: translate(-2.5px, -2.5px);
                  box-shadow: 5px 5px 0 0 black;
              `}
    font-size: 32px;
    line-height: 1.3;
    border: 1px solid black;
    padding: 5px 20px;
    transition: box-shadow 0.3s, transform 0.3s, background-color 0.3s,
        color 0.6s;

    &:hover {
        box-shadow: none;
        transform: none;
    }

    ${({ isLoaded }) =>
        isLoaded
            ? css`
                  cursor: pointer;
              `
            : css`
                  color: white;
                  border: none;
                  box-shadow: none;
                  cursor: wait;
              `}
`

function splitAnswer(answer: string) {
    const pattern = /[\w\s\’\'\,\"\-]*[\.]{0,3}[\w\s\’\'\,¥-]*/
    const space = /\s/
    const matches = answer.match(pattern)![0].trim()
    const words = matches.split(space).map(word => {
        const pattern = /[\w\’\'\-]+/
        return word.match(pattern)![0]
    })

    return convertLowerCaseWords(words)
}

function splitDisplayAnswer(answer: string) {
    const pattern = /[\w\s\.\,\?\!\"\'\’\'\-]*/
    const space = /\s/
    const matches = answer.match(pattern)![0]
    return matches.split(space)
}

function checkAnInitialLetter(word: string) {
    return (
        word == 'I' ||
        word == 'Canada' ||
        word == 'Adobe' ||
        word == 'Japan' ||
        word == 'John' ||
        word == 'Wesley' ||
        word == 'Arthur' ||
        word == 'Miller' ||
        word == 'Gospel' ||
        word == 'Saint' ||
        word == 'Tom'
    )
}

function convertLowerCaseWords(words: string[]) {
    return words.map(word =>
        !checkAnInitialLetter(word) ? word.toLowerCase() : word,
    )
}

export default function QuestionArea({
    answer,
    width,
}: {
    answer: string
    width: number
}) {
    const displayWords = splitDisplayAnswer(answer)
    const words = splitAnswer(answer)
    const correctOrderWords = [...words]
    const [isSolved, setIsSolved] = useState(false)
    const [checkIdx, setCheckIdx] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const listRefs = useRef<
        {
            [key in number]: HTMLLIElement
        }
    >({})
    const answerRef = useRef<HTMLDivElement>(null!)

    const generatedListRefs = useMemo(
        () =>
            words.map((_, i) => ({
                id: i,
                refCallbackFunction: (node: HTMLLIElement | null) => {
                    if (node !== null && listRefs.current[i] === undefined) {
                        listRefs.current[i] = node
                    } else {
                        delete listRefs.current[i]
                    }
                },
            })),
        [words],
    )

    const [isPressedList, setIsPressedList] = useState(
        new Array(generatedListRefs.length).fill(false),
    )

    const isSolvedStore = useIsSolvedStore().isSolved

    const isLoadedStore = useIsLoadedStore().isLoaded

    useEffect(() => {
        const shuffleWords = shuffle(words)
        shuffleWords.forEach((word, i) => {
            listRefs.current[i].textContent = word
        })
    }, [])

    useEffect(() => {
        if (!isSolvedStore) {
            resetHandler()
        }
    }, [isSolvedStore])

    useEffect(() => {
        if (isLoadedStore) {
            setIsLoaded(prev => true)
        } else {
            setIsLoaded(prev => false)
            const shuffleWords = shuffle(words)
            setTimeout(() => {
                shuffleWords.forEach((word, i) => {
                    listRefs.current[i].textContent = word
                })
            }, 700)
        }
    }, [isLoadedStore])

    function solvedHandler(word: string) {
        answerRef.current.textContent += word
        setIsSolved(prev => true)
        saveIsSolvedStore(true)
    }

    function answerRefHandler(word: string) {
        if (correctOrderWords.length - 1 == checkIdx) {
            solvedHandler(word)
        } else {
            answerRef.current.textContent += word + ' '
        }
    }

    function resetHandler() {
        answerRef.current.textContent = ''
        setCheckIdx(prev => 0)
        setIsSolved(prev => false)
        setIsPressedList(prev =>
            new Array(generatedListRefs.length).fill(false),
        )
    }

    const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        const $dom = e.target as HTMLLIElement
        const word = $dom.textContent

        if (!isSolved && isLoaded) {
            if (correctOrderWords[checkIdx] == word) {
                answerRefHandler(displayWords[checkIdx])
                setCheckIdx(prev => ++prev)
                setIsPressedList(prev =>
                    prev.map((value, i) => value || +$dom.id == i),
                )
            } else {
                resetHandler()
            }
        }
    }

    return (
        <SSection width={width}>
            <SAnswerArea customRef={answerRef}></SAnswerArea>
            <>
                <SUl isLoaded={isLoaded}>
                    {generatedListRefs.map(({ id, refCallbackFunction }, i) => (
                        <SLi
                            id={i}
                            key={id}
                            customRef={refCallbackFunction}
                            isSolved={isSolved}
                            isLoaded={isLoaded}
                            isPressed={isPressedList[i]}
                            onClick={clickHandler}></SLi>
                    ))}
                </SUl>
            </>
        </SSection>
    )
}
