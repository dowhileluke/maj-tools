import { pluckPair, pluckSequence, pluckTiles, pluckTriplet } from './pluck'

type ShantenState = {
    hand: number[];
    index: number;
    pair: number;
    complete: number;
    partial: number;
}

export function shanten(hand: number[]) {
    console.count('shanten')

    const init: ShantenState = {
        hand,
        index: 1,
        pair: 0,
        complete: 0,
        partial: 0,
    }
    let best = 8

    // try all pair candidates
    for (let i = 1; i < hand.length; i++) {
        if (hand[i] > 1) {
            const s = extractComplete({
                ...init,
                hand: pluckPair(hand, i),
                pair: 1,
            })

            best = Math.min(best, s)
        }
    }

    // try without a pair
    const s = extractComplete(init)

    return Math.min(best, s)
}

function isSeq(hand: number[], i: number, length = 3) {
    return i < 30 && hand.slice(i, i + length).every(n => n)
}

function extractComplete(state: ShantenState) {
    let best = 8

    for (let i = state.index; i < state.hand.length; i++) {
        if (state.hand[i] > 2) {
            const s = extractComplete({
                ...state,
                hand: pluckTriplet(state.hand, i),
                index: i,
                complete: state.complete + 1,
            })

            best = Math.min(best, s)
        }

        if (isSeq(state.hand, i)) {
            const s = extractComplete({
                ...state,
                hand: pluckSequence(state.hand, i),
                index: i,
                complete: state.complete + 1,
            })

            best = Math.min(best, s)
        }
    }

    const s = extractPartial({
        ...state,
        index: 0,
    })

    return Math.min(best, s)
}

function calc({ pair, complete, partial }: ShantenState) {
    let result = 8 - (complete * 2) - Math.min(partial + pair, 4 - complete)

    if (pair && (complete + partial + pair) > 4) {
        result -= 1
    }
    
    return result
}

function extractPartial(state: ShantenState) {
    // could probably short-circuit here with a large partial count

    let best = 8

    for (let i = state.index; i < state.hand.length; i++) {
        const n = state.hand[i]

        if (n < 1) continue

        // pair
        if (n > 1) {
            const s = extractPartial({
                ...state,
                hand: pluckPair(state.hand, i),
                index: i,
                pair: state.pair + 1,
            })

            best = Math.min(best, s)
        }

        // penchan or ryanmen
        if (isSeq(state.hand, i, 2)) {
            const s = extractPartial({
                ...state,
                hand: pluckSequence(state.hand, i, 2),
                index: i,
                partial: state.partial + 1,
            })

            best = Math.min(best, s)
        }

        // kanchan
        if (i < 30 && (i % 10) < 9 && state.hand[i + 2]) {
            const s = extractPartial({
                ...state,
                hand: pluckTiles(state.hand, [i, i + 2]),
                index: i,
                partial: state.partial + 1,
            })

            best = Math.min(best, s)
        }
    }

    let s = calc(state)

    return Math.min(best, s)
}
