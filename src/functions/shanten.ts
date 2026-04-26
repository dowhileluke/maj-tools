import { pluckPair, pluckSequence, pluckTriplet } from "./pluck";


type ShantenInput = {
    hand: number[];
    index: number;
    pair: 0 | 1;
    complete: number;
    partial: number;
}

export function shanten(input: ShantenInput) {
    let result = 8

    for (let i = input.index; i < input.hand.length; i++) {
        if (input.hand[i] > 1) {
            const s = extractComplete({
                ...input,
                hand: pluckPair(input.hand, i),
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

function extractComplete(input: ShantenInput) {
    for (let i = input.index; i < input.hand.length; i++) {
        if (input.hand[i] > 2) {
            return extractComplete({
                ...input,
                hand: pluckTriplet(input.hand, i),
                index: i,
                complete: input.complete + 1,
            })
        }

        if (isSeq(input.hand, i)) {
            return extractComplete({
                ...input,
                hand: pluckSequence(input.hand, i),
                index: i,
                complete: input.complete + 1,
            })
        }
    }

    return extractPartial({
        ...input,
        index: 0,
    })
}

function extractPartial(input: ShantenInput) {
    for (let i = input.index; i < input.hand.length; i++) {
        // extract partial groups here
    }

    //// let currentShanten = 8 - (completeSets * 2) - partialSets - pair;
    const result = 999
}
