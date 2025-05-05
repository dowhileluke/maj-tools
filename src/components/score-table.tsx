import { HAN_LIST, LIMIT_HANDS, MANGAN_BASE_VALUE } from '../const'
import { BorderBox } from './border-box'
import { Cell } from './cell'
import { ValueCell } from './value-cell'
import { FuTable } from './fu-table'
import { Note } from './note'

const labelBorder = 'border-b border-l'

export function ScoreTable() {
	return (
		<div className="flex flex-col items-end landscape:flex-row landscape:gap-4">
			<div>
				<div className="flex">
					<div className="w-20 mt-px">
						<Cell short borders="border-b" />
						{HAN_LIST.map(han => (
							<Cell key={han} borders={labelBorder}>
								{han} han
							</Cell>
						))}
					</div>

					<FuTable />
				</div>
			</div>

			<div className="flex landscape:border-t">
				<div className="w-20">
					{LIMIT_HANDS.map(({ han, name, baseValue }) => (
						<Cell key={han} borders={labelBorder} className={baseValue === MANGAN_BASE_VALUE ? 'bg-mangan' : ''}>
							{han === 'Y' ? name : (
								<>
									{han} han
									<Note>
										{name}
									</Note>
								</>
							)}
						</Cell>
					))}
				</div>

				<BorderBox>
					<div className="w-72 landscape:w-24">
						{LIMIT_HANDS.map(({ baseValue }, index) => (
							<ValueCell key={baseValue} han={index} fu={0} />
						))}
					</div>
				</BorderBox>
			</div>
		</div>
	)
}
