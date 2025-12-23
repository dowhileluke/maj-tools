import { HAN_LIST, LIMIT_HANDS, MANGAN_BASE_VALUE } from '../const'
import { BorderBox } from './border-box'
import { Cell } from './cell'
import { ValueCell } from './value-cell'
import { FuTable } from './fu-table'
import { Note } from './note'
import { DualPanel } from './dual-panel'

const labelBorder = 'border-b border-l'

export function ScoreTable() {
	return (
		<div className="grid justify-center items-center overflow-hidden">
			<DualPanel expand="above" trigger="landscape" className="items-end landscape:gap-4 overflow-hidden">
				<div className="flex max-w-full overflow-hidden">
					<div className="w-20 shrink-0 mt-px">
						<Cell short borders="border-b" />
						{HAN_LIST.map(han => (
							<Cell key={han} borders={labelBorder}>
								{han} han
							</Cell>
						))}
					</div>

					<FuTable />
				</div>

				<div className="flex w-full landscape:border-t">
					<div className="w-20 shrink-0">
						{LIMIT_HANDS.map(({ hanLabel, name, baseValue }) => (
							<Cell key={hanLabel} borders={labelBorder} className={baseValue === MANGAN_BASE_VALUE ? 'bg-mangan' : ''}>
								{hanLabel === 'Y' ? name : (
									<>
										{hanLabel} han
										<Note>
											{name}
										</Note>
									</>
								)}
							</Cell>
						))}
					</div>

					<BorderBox className="grow min-w-20">
						<div>
							{LIMIT_HANDS.map(({ baseValue }, index) => (
								<ValueCell key={baseValue} han={index} fu={0} />
							))}
						</div>
					</BorderBox>
				</div>
			</DualPanel>
		</div>
	)
}
