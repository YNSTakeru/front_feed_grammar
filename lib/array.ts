/* eslint-disable */

export function getRandomValueFromArray<T extends {}>(arry: T[]) {
    const max = arry.length
    const chosenNumber = Math.floor(Math.random() * max)
    return arry[chosenNumber]
}

export function shuffle<T>(array: T[]) {
    const length = array == null ? 0 : array.length
    if (!length) return []
    let index = -1
    const lastIndex = length - 1
    const result = [...array]
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        const value = result[rand]
        result[rand] = result[index]
        result[index] = value
    }
    return result
}

export function getNextArrayValue<T extends { id: number }>({
    arry,
    id,
}: {
    arry: T[]
    id: number
}) {
    return arry
        .map((value, i) =>
            value.id == id ? arry[(i + 1) % arry.length] : false,
        )
        .filter(value => value)[0] as T
}
export function getPrevArrayValue<T extends { id: number }>({
    arry,
    id,
}: {
    arry: T[]
    id: number
}) {
    return arry
        .map((value, i) =>
            value.id == id ? arry[i - 1 < 0 ? arry.length - 1 : i - 1] : false,
        )
        .filter(value => value)[0] as T
}
