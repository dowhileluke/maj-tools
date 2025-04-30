import { HAN_LIST, LIMIT_HANDS, MANGAN_BASE_VALUE } from '../const'
import { BorderBox } from './border-box'
import { Cell } from './cell'
import { ValueCell } from './value-cell'
import { FuTable } from './fu-table'
import { Note } from './note'

const labelBorder = 'border-b border-l'

export function ScoreTable() {
	return (
		<div className="inline-grid grid-cols-[auto_auto]">
			<div className="mt-px">
				<Cell short borders="border-b" />
				{HAN_LIST.map(han => (
					<Cell key={han} borders={labelBorder}>
						{han} han
					</Cell>
				))}
			</div>

			<FuTable />

			<div className="w-20">
				{LIMIT_HANDS.map(({ han, name, baseValue }) => (
					<Cell key={han} borders={labelBorder} className={baseValue === MANGAN_BASE_VALUE ? 'bg-mangan' : ''}>
						{han === 'Y' ? '★' : `${han} han`}
						<Note>
							{name}
						</Note>
					</Cell>
				))}
			</div>

			<BorderBox>
				<div>
					{LIMIT_HANDS.map(({ baseValue }, index) => (
						<ValueCell key={baseValue} han={index} fu={0} />
					))}
				</div>
			</BorderBox>
		</div>
	)
}
