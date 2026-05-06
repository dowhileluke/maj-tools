import { describe, expect, test } from 'vitest'
import { decodeTiles, encodeTiles } from './tile-encoding'
import { generateArray } from '@dowhileluke/fns'

describe('encodeTiles', () => {
    test('sorts and groups tiles', () => {
        expect(encodeTiles([23, 15, 14, 13, 25, 24])).toEqual('345p345s')
    })

    test('no unnecessary suffixes', () => {
        expect(encodeTiles([15, 15, 23])).toEqual('55p3s')
    })

    test('strips >4 copies of a tile', () => {
        expect(encodeTiles([1, 1, 1, 1, 1, 1])).toEqual('1111m')
    })

    test('add honor suffix', () => {
        expect(encodeTiles([31])).toEqual('1z')
    })

    test('strange tile indexes are ignored, and capped at 14 length', () => {
        expect(encodeTiles(generateArray(20))).toEqual('123456789m123p')
    })
})

describe('decodeTiles', () => {
    test('extracts relevant text', () => {
        expect(decodeTiles('🪲1p')).toEqual([11])
        expect(decodeTiles('/efficiency hand: 4456778899m45p67s')).toEqual([4, 4, 5, 6, 7, 7, 8, 8, 9, 9, 14, 15, 26, 27])
    })

    test('takes the first 14 tiles (sorted, fifth+ copies pruned)', () => {
        expect(decodeTiles('11111m22222m33333m8888888m66666666m7777m')).toEqual([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 6, 6])
    })

    test('understands aka `0` notation', ( )=> {
        expect(decodeTiles('406m')).toEqual([4, 5, 6])
    })

    test('unexpected number treated as jihai', ( )=> {
        expect(decodeTiles('02')).toEqual([32, 35])
    })
})
