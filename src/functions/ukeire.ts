import { generateArray } from '@dowhileluke/fns';
import { pluckTiles } from './pluck'
import { putTiles } from './put'
import { shanten } from './shanten'

export type Ukeire = {
    count: number;
    tiles: number[];
}

export type MultiUke = Ukeire & {
    t: number;
}

// adds data for [Good Tiles/Accepted]
export type AdvancedUke = MultiUke & {
    prefCount: number;
    preferred: number[];
    remaining: number[];
}

const THIRTY_EIGHT = generateArray(38)

// hand = 13 tiles
export function ukeire(hand: number[], wall?: number[], baseline?: number, tiles?: number[]) {
    console.count('ukeire')

    if (!wall) {
        wall = hand.map(n => 4 - n)
    }

    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
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

        const considered = shanten(putTiles(hand, [t]))

        if (considered < baseline) {
            result.count += available
            result.tiles.push(t)
        }
    }

    return result
}

// hand = 14 wide
export function multiUkeire(hand: number[], wall?: number[], baseline?: number, tiles?: number[]) {
    if (!wall) {
        wall = hand.map(n => 4 - n)
    }

    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
    }

    const result: MultiUke[] = []

    for (const [t, n] of hand.entries()) {
        if (t % 10 === 0 || n < 1) continue

        const uke = ukeire(pluckTiles(hand, [t]), wall, baseline, tiles)

        if (uke.count) {
            result.push({ ...uke, t, })
        }
    }

    return result
}

// hand = 14 tiles
export function advancedUke(hand: number[], wall: number[], uke: MultiUke) {
    const baseHand = pluckTiles(hand, [uke.t])

    let prefCount = 0
    const preferred: number[] = []
    const remaining: number[] = []

    for (const t of uke.tiles) {
        const tenpaiHand = putTiles(baseHand, [t])
        const tenpaiForms = multiUkeire(tenpaiHand, wall, 0, uke.tiles)

        if (tenpaiForms.some(f => f.count > 4)) {
            prefCount += wall[t]
            preferred.push(t)
        } else {
            remaining.push(t)
        }
    }

    const result: AdvancedUke = {
        ...uke,
        prefCount,
        preferred,
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
    const ukeList = multiUkeire(hand, wall, baseline)

    // not iishanten
    if (baseline !== 1) return ukeList

    return ukeList.map(uke => advancedUke(hand, wall, uke))
}
