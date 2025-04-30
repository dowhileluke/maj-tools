import { toRoundedValue } from "./to-rounded-value";

type PaymentValue = {
	ron: string | number;
	tsumo: Array<string | number>
}

function toDelta(n: number) {
	return '+' + n
}

export function toPaymentValue(baseValue: number, isDealer: boolean, isDelta: boolean) {
	const dealerTsumo = toRoundedValue(baseValue * 2)
	const ronMult = isDealer ? 6 : 4
	const baseRon = toRoundedValue(ronMult * baseValue)
	const ron = isDelta ? toDelta(baseRon * 2) : baseRon

	if (isDealer) {
		const result: PaymentValue = {
			ron,
			tsumo: [`${isDelta ? toDelta(dealerTsumo * 4) : dealerTsumo} all`],
		}

		return result
	}

	const baseTsumo = toRoundedValue(baseValue)
	const tsumoSum = (baseTsumo * 2) + dealerTsumo

	const result: PaymentValue = {
		ron,
		tsumo: isDelta ? [toDelta(baseTsumo + tsumoSum), toDelta(dealerTsumo + tsumoSum)] : [baseTsumo, dealerTsumo],
	}

	return result
}
