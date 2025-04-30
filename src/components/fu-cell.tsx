import { toBaseValue } from '../functions/to-base-value'
import { Cell } from './cell'
import { toRoundedValue } from '../functions/to-rounded-value'
import { concat } from '../functions/concat'
import { KIRIAGE_BASE_VALUE } from '../const'

type FuCellProps = {
	baseValue: ReturnType<typeof toBaseValue>;
}

export function FuCell({ baseValue }: FuCellProps) {
	if (!baseValue) return (<Cell />)

	return (
		<Cell className={concat('w-24', baseValue === KIRIAGE_BASE_VALUE ? 'bg-mangan' : 'bg-white')}>
			<span>
				{toRoundedValue(4 * baseValue)}
			</span>
			<span className="text-sm leading-none">
				{toRoundedValue(baseValue)}/{toRoundedValue(2 * baseValue)}
			</span>
		</Cell>
	)
}