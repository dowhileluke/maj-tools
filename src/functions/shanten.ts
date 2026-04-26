import { pluckPair, pluckSequence, pluckTriplet } from "./pluck";


type ShantenState = {
    hand: number[];
    index: number;
    pair: 0 | 1;
    complete: number;
    partial: number;
}

export function shanten(state: ShantenState) {
    let result = 8

    for (let i = state.index; i < state.hand.length; i++) {
        if (state.hand[i] > 1) {
            const s = extractComplete({
                ...state,
                hand: pluckPair(state.hand, i),
                pair: 1,
            })

            result = Math.min(result, s)
        }
    }

    return result
}

function isSeq(hand: number[], i: number) {
    if (i >= 30) return false // honor

    if (hand[i + 0] < 1) return false
    if (hand[i + 1] < 1) return false
    if (hand[i + 2] < 1) return false

    return true
}

function extractComplete(state: ShantenState) {
    for (let i = state.index; i < state.hand.length; i++) {
        if (state.hand[i] > 2) {
            return extractComplete({
                ...state,
                hand: pluckTriplet(state.hand, i),
                index: i,
                complete: state.complete + 1,
            })
        }

        if (isSeq(state.hand, i)) {
            return extractComplete({
                ...state,
                hand: pluckSequence(state.hand, i),
                index: i,
                complete: state.complete + 1,
            })
        }
    }

    return extractPartial({
        ...state,
        index: 0,
    })
}

function toResult({ pair, complete, partial }: ShantenState) {
    return 8 - (complete * 2) - partial - pair
}

function extractPartial(state: ShantenState) {
    for (let i = state.index; i < state.hand.length; i++) {
        // extract partial groups here
    }

    return toResult(state)
}

// let temp = Array.from({ length: 38 }).fill(0)

// temp[1] = 3
// temp[2] = 3
// temp[3] = 3

// temp
