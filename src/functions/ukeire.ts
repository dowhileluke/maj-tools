import { generateArray } from '@dowhileluke/fns'
import { pluckTiles } from './pluck'
import { putTiles } from './put'
import { shanten } from './shanten'

export type Ukeire = {
    count: number;
    tiles: number[];
}

export type MultiUke = Ukeire & {
    discards: number[];
}

// adds data for [Good Tiles/Accepted]
export type AdvancedUke = MultiUke & {
    goodCount: number;
    goodTiles: number[];
    remaining: number[];
}

const THIRTY_EIGHT = generateArray(38)

// hand = 13 tiles
export function ukeire(hand: number[], baseline?: number, wall?: number[], tiles?: number[]) {
    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
    }

    if (!wall) {
        wall = hand.map(n => 4 - n)
    }

    // configurable tiles to test
    if (!tiles) {
        tiles = THIRTY_EIGHT // all of them
    }

    const result: Ukeire = {
        count: 0,
        tiles: [],
    }

    for (const t of tiles) {
        const available = wall[t]

        if (t % 10 === 0 || !available) continue

        const considered = shanten(putTiles(hand, [t]), baseline - 1)

        if (considered < baseline) {
            result.count += available
            result.tiles.push(t)
        }
    }

    return result
}

// hand = 14 wide
export function multiUkeire(hand: number[], baseline?: number, wall?: number[], eligibleTiles?: number[]) {
    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
    }

    if (!wall) {
        wall = hand.map(n => 4 - n)
    }

    const keys: string[] = []
    const results: Record<string, MultiUke> = {}

    for (const [t, n] of hand.entries()) {
        if (t % 10 === 0 || n < 1) continue

        const { count, tiles } = ukeire(pluckTiles(hand, [t]), baseline, wall, eligibleTiles)

        if (count) {
            const k = tiles.join(',')
            const seen = results[k]

            if (!seen) {
                results[k] = { discards: [t], count, tiles }
                keys.push(k)
            } else {
                seen.discards.push(t)
            }
        }
    }

    return keys.map(k => results[k])
}

// hand = 14 tiles
export function advancedUke(hand: number[], wall: number[], uke: MultiUke) {
    const baseHand = pluckTiles(hand, [uke.discards[0]])

    let goodCount = 0
    const goodTiles: number[] = []
    const remaining: number[] = []

    for (const t of uke.tiles) {
        const tenpaiHand = putTiles(baseHand, [t])
        const tenpaiForms = multiUkeire(tenpaiHand, 0, wall, uke.tiles)

        if (tenpaiForms.some(f => f.count > 4)) {
            goodCount += wall[t]
            goodTiles.push(t)
        } else {
            remaining.push(t)
        }
    }

    const result: AdvancedUke = {
        ...uke,
        goodCount,
        goodTiles,
        remaining,
    }

    return result
}

// hand = 14 tiles
export function groupedUke(hand: number[], baseline?: number) {
    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
    }

    const wall = hand.map(n => 4 - n)
    const ukeList = multiUkeire(hand, baseline, wall)

    // not iishanten
    if (baseline !== 1) return ukeList

    return ukeList.map(uke => advancedUke(hand, wall, uke))
}
