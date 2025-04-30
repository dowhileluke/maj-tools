import { FU_LIST, HAN_LIST } from '../const'
import { BorderBox } from './border-box'
import { Cell } from './cell'
import { ValueCell } from './value-cell'
import { Note } from './note'

const colStyle = 'flex flex-col shrink-0 w-24 snap-start first:border-l'
const notes: Record<number, string> = {
	20: 'Pinfu + Tsumo',
	25: 'Chiitoi',
}

export function FuTable() {
	return (
		<BorderBox className="border-t">
			<div className="flex w-72 overflow-auto snap-x no-scrollbar touch-pan-x">
				{FU_LIST.map(fu => (
					<div key={fu} className={colStyle}>
						<Cell short>
							<span>{fu} fu</span>
							{notes[fu] && (<Note>{notes[fu]}</Note>)}
						</Cell>
						{HAN_LIST.map(han => (
							<ValueCell key={han} han={han} fu={fu} />
						))}
					</div>
				))}
			</div>
		</BorderBox>
	)
}
