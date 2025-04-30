import { FU_LIST, HAN_LIST } from '../const'
import { toBaseValue } from '../functions/to-base-value'
import { BorderBox } from './border-box'
import { Cell } from './cell'
import { FuCell } from './fu-cell'
import { Note } from './note'

const colStyle = 'flex flex-col shrink-0 w-24 snap-start'
const notes: Record<number, string> = {
	20: 'Pinfu + Tsumo',
	25: 'Chiitoi',
}

export function FuTable() {
	return (
		<BorderBox>
			<div className="flex w-72 overflow-auto no-scrollbar bg-linear-to-r from-transparent to-mangan snap-x">
				{FU_LIST.map(fu => (
					<div key={fu} className={colStyle}>
						<Cell short bordered>
							<span>{fu} fu</span>
							{notes[fu] && (<Note>{notes[fu]}</Note>)}
						</Cell>
						{HAN_LIST.map(han => (
							<FuCell key={han} baseValue={toBaseValue(han, fu)} />
						))}
					</div>
				))}
			</div>
		</BorderBox>
	)
}
