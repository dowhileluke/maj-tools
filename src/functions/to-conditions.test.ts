import { expect, test } from 'vitest'
import { toConditions } from './to-conditions'

test('overtake dealer for 3rd', () => {
	const scores = [0, 11_111, 11_000, 11_000]
	const conditions = toConditions({ scores, dealerIndex: 1, repeatCount: 0, leftoverCount: 0, })

	expect(conditions[1]).toBeNull()
	expect(conditions[2]?.tsumo?.key).toEqual('4h30')
})

test('overtake three-way tie', () => {
	const scores = [0, 11_000, 11_000, 11_000]
	const conditions = toConditions({ scores, dealerIndex: 0, repeatCount: 0, leftoverCount: 0, })

	// 2nd place is impossible; directRon will take 3rd
	expect(conditions[1]).toBeNull()
	expect(conditions[2]?.simpleRon).toBeNull()
	expect(conditions[2]?.directRon).not.toBeNull()
})

test('tied players have no directRon', () => {
	const scores = [0, 1_000, 1_000]
	const conditions = toConditions({ scores, dealerIndex: 0, repeatCount: 0, leftoverCount: 0, })

	expect(conditions[0]?.directRon).toBeNull()
})

test('yakuman tsumo', () => {
	const scores = [0, 63_000]
	const conditions = toConditions({ scores, dealerIndex: 0, repeatCount: 0, leftoverCount: 0, })

	expect(conditions[0]?.directRon?.key).toEqual('11h')
	expect(conditions[0]?.tsumo?.key).toEqual('Y')
})

test('correctly identify dealer tsumo ranking v1', () => {
	const scores = [14_300, 23_000, 30_000, 44_000]
	const conditions = toConditions({ scores, dealerIndex: 2, repeatCount: 2, leftoverCount: 0, })

	expect(conditions[2]?.tsumo).toBeTruthy()
})

test('correctly identify dealer tsumo ranking v2', () => {
	const scores = [15_000, 23_000, 30_000, null]
	const conditions = toConditions({ scores, dealerIndex: 2, repeatCount: 0, leftoverCount: 0, })

	expect(conditions[1]?.tsumo).toBeTruthy()
})

test('leftover stick with direct ron', () => {
	const scores = [21_000, 30_000, null, null]
	const conditions = toConditions({ scores, dealerIndex: 2, repeatCount: 0, leftoverCount: 1, })

	expect(conditions[0]?.directRon?.key).toEqual('2h70')
})
