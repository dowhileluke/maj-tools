import { EMPTY_HAND } from '../const'
import { putTiles } from './put'

const suffix: Record<number, string> = {
    0: '',
    10: 'm',
    20: 'p',
    30: 's',
}

export function encodeTiles(tiles: number[]) {
    const hand = putTiles(EMPTY_HAND, tiles.slice(0, 14))
    const parts: Array<number | string> = []
    let isSufActive = false

    for (const [t, count] of hand.entries()) {
        const suf = suffix[t]

        if (typeof suf === 'string') {
            if (isSufActive) {
                parts.push(suf)
            }

            isSufActive = false
        } else {
            for (let i = 0; i < count && i < 4; i++) {
                parts.push(t % 10)
            }

            if (count) {
                isSufActive = true
            }
        }
    }

    if (isSufActive) {
        parts.push('z')
    }

    return parts.join('')
}

const suffixMod: Record<string, number> = {
    m: 0,
    p: 10,
    s: 20,
    z: 30,
}

function isDigit(ch: string) {
    return /\d/.test(ch)
}

export function decodeTiles(s: string) {
    const parts = s.split('').concat('z')
    const hand = EMPTY_HAND.slice()
    let buffer: number[] = []

    for (const ch of parts) {
        const mod = suffixMod[ch]

        if (typeof mod === 'number') {
            for (const n of buffer) {
                const t = n + mod

                if (t < 38) {
                    hand[t]++
                }
            }

            buffer = []
        } else {
            if (isDigit(ch)) {
                buffer.push(Number(ch) || 5)
            }
        }
    }

    const result: number[] = []

    for (const [t, count] of hand.entries()) {
        for (let i = 0; i < count && i < 4; i++) {
            result.push(t)
        }
    }

    return result.slice(0, 14)
}
