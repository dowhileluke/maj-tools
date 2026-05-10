import { generateArray } from "@dowhileluke/fns"

export function pluckTiles(hand: number[], indexes: number[]) {
    const result = [...hand]

    for (const idx of indexes) {
        if (result[idx] < 1) {
            throw new Error(`no tiles at idx ${idx}`)
        }

        result[idx]--
    }

    return result
}

export function pluckPair(hand: number[], index: number) {
    return pluckTiles(hand, [index, index])
}

export function pluckTriplet(hand: number[], index: number) {
    return pluckTiles(hand, [index, index, index])
}

export function pluckSequence(hand: number[], index: number, length = 3) {
    return pluckTiles(hand, generateArray(length, n => n + index))
}
