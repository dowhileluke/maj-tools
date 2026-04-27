import { pluckTiles } from './pluck'
import { shanten } from './shanten'

export type Ukeire = [number, number[]]
export type GroupedUke = [number, number[], number, number[], number[]]

function addTile(hand: number[], index: number) {
    const result = [...hand]

    result[index] += 1

    return result
}

export function ukeire(hand: number[], wall?: number[], baseline?: number) {
    if (!wall) {
        wall = hand.map(n => 4 - n)
    }

    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
    }

    let uke = 0
    let tiles: number[] = []

    for (let i = 0; i < wall.length; i++) {
        const available = wall[i]

        if (i % 10 === 0 || !available) continue

        const considered = shanten(addTile(hand, i))

        if (considered < baseline) {
            uke += available
            tiles.push(i)
        }
    }

    return [uke, tiles] as Ukeire
}

export function multiUkeire(hand: number[], wall?: number[], baseline?: number) {
    if (!wall) {
        wall = hand.map(n => 4 - n)
    }

    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
    }

    return hand.map((n, i): Ukeire => {
        if (i % 10 === 0 || n < 1) {
            return [0, []]
        }

        return ukeire(pluckTiles(hand, [i]), wall, baseline)
    })
}

export function groupedUke(hand: number[], baseline?: number) {
    if (typeof baseline === 'undefined') {
        baseline = shanten(hand)
    }

    const wall = hand.map(n => 4 - n)
    const ukeList = multiUkeire(hand, wall, baseline)

    // not iishanten
    if (baseline !== 1) return ukeList

    return ukeList.map(([n, tiles], i): GroupedUke => {
        if (tiles.length < 1) return [0, [], 0, [], []]

        let m = 0
        const many: number[] = []
        const few: number[] = []

        for (const t of tiles) {
            const nextHand = addTile(pluckTiles(hand, [i]), t)
            const [waits] = ukeire(nextHand, wall, 0)

            if (waits > 4) {
                m += wall[t]
                many.push(t)
            } else {
                few.push(t)
            }
        }

        return [n, tiles, m, many, few]
    })
}
