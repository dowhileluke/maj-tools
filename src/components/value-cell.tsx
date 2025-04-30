import { toBaseValue } from '../functions/to-base-value'
import { Cell } from './cell'
import { concat } from '../functions/concat'
import { KIRIAGE_BASE_VALUE, LIMIT_HANDS, MANGAN_BASE_VALUE } from '../const'
import { useAppState } from '../hooks/use-app-state'
import { toPaymentValue } from '../functions/to-payment-value'
import { Note } from './note'

type ValueCellProps = {
	han: number;
	fu: number; // 0 for limit hands
}

const leadingStyle = 'leading-[1rem]'

export function ValueCell({ han, fu }: ValueCellProps) {
	const [{ isDealer, isDelta }] = useAppState()
	let baseValue = fu ? toBaseValue(han, fu) : LIMIT_HANDS[han].baseValue
	let isMangan = fu ? (baseValue >= KIRIAGE_BASE_VALUE) : (baseValue === MANGAN_BASE_VALUE)

	if (fu > 0 && baseValue > MANGAN_BASE_VALUE) {
		baseValue = 0
	}

	const cellStyle = concat('w-24', isMangan && 'bg-mangan')

	if (!baseValue) return (
		<Cell className={cellStyle} borders={isMangan ? 'border-none' : ''} />
	)

	const payment = toPaymentValue(baseValue, isDealer, isDelta)
	const isWide = fu > 0 && !isDealer && isDelta

	return (
		<Cell className={cellStyle}>
			<span className={leadingStyle}>
				{fu === 20 ? '-' : payment.ron}
			</span>
			<span className={concat(isWide ? "text-xs" : "text-sm", leadingStyle)}>
				{fu === 25 && han === 2 ? '-' : payment.tsumo.join('/')}
			</span>
		</Cell>
	)
}
