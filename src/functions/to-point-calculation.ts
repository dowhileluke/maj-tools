import { PointCalculation } from '../types'
import { toRoundedValue } from './to-rounded-value'

export function toPointCalculation(baseValue: number) {
	const [koTsumo, oyaTsumo, koRon, oyaRon] = [1, 2, 4, 6].map(n => toRoundedValue(n * baseValue))
	const [koGainsByRon, oyaGainsByRon] = [koRon, oyaRon].map(n => 2 * n)

	const result: PointCalculation = {
		koTsumo, oyaTsumo, koRon, oyaRon,
		koGainsByRon, oyaGainsByRon,
		koGainsVsKoByTsumo: (3 * koTsumo) + oyaTsumo,
		koGainsVsOyaByTsumo: 2 * (koTsumo + oyaTsumo),
		oyaGainsByTsumo: 4 * oyaTsumo,
	}

	return result
}
