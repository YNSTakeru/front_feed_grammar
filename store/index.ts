import { Section } from '@/types/database/tables'
import { create } from 'zustand'

export type SectionListState = {
    sectionList: Section[]
    addSection: (newSection: Section) => void
}

export type ProgressPercentageState = {
    progressPercent: number
    setProgressPercent: (newValue: number) => void
}

export type IsSolvedState = {
    isSolved: boolean
    changeIsSolved: (newValue: boolean) => void
}

export type IsLoadedState = {
    isLoaded: boolean
    setLoaded: (newaValue: boolean) => void
}

export type IsRestartState = {
    isRestartStore: boolean
    setIsRestart: (newValue: boolean) => void
}

export const useProgressPercentStore = create<ProgressPercentageState>(set => ({
    progressPercent: 0,
    setProgressPercent: newValue => set(_ => ({ progressPercent: newValue })),
}))

export const useIsLoadedStore = create<IsLoadedState>(set => ({
    isLoaded: false,
    setLoaded: newValue =>
        set(_ => ({
            isLoaded: newValue,
        })),
}))

export const useIsSolvedStore = create<IsSolvedState>(set => ({
    isSolved: false,
    changeIsSolved: newValue => set(_ => ({ isSolved: newValue })),
}))

export const useIsRestartStore = create<IsRestartState>(set => ({
    isRestartStore: false,
    setIsRestart: newValue => set({ isRestartStore: newValue }),
}))

export function saveIsSolvedStore(isSolved: boolean) {
    useIsSolvedStore.setState(state => ({
        isSolved,
    }))
}

export function setIsLoadedStore(newValue: boolean) {
    useIsLoadedStore.setState(state => ({
        isLoaded: newValue,
    }))
}

export function saveIsRestartStore(newValue: boolean) {
    useIsRestartStore.setState(state => ({
        isRestartStore: newValue,
    }))
}

const useStore = create<SectionListState>(set => ({
    sectionList: [],
    addSection: newSection =>
        set(({ sectionList }) => ({
            sectionList: [...sectionList, newSection],
        })),
}))

export default useStore
