import { HAN_LIST, LIMIT_HANDS, MANGAN_BASE_VALUE } from '../const'
import { BorderBox } from './border-box'
import { Cell } from './cell'
import { FuCell } from './fu-cell'
import { FuTable } from './fu-table'
import { Note } from './note'

export function ScoreTable() {
	return (
		<div className="inline-grid grid-cols-[auto_auto]">
			<div>
				<Cell short />
				{HAN_LIST.map(han => (
					<Cell key={han}>
						{han} han
					</Cell>
				))}
			</div>

			<FuTable />

			<div className="w-20">
				{LIMIT_HANDS.map(({ han, name, baseValue }) => (
					<Cell key={han} className={baseValue === MANGAN_BASE_VALUE ? 'bg-limit' : ''}>
						{han === 'Y' ? '★' : `${han} han`}
						<Note>
							{name}
						</Note>
					</Cell>
				))}
			</div>

			<BorderBox>
				<div>
					{LIMIT_HANDS.map(({ baseValue }) => (
						<FuCell key={baseValue} baseValue={baseValue} />
					))}
				</div>
			</BorderBox>
		</div>
	)
}
