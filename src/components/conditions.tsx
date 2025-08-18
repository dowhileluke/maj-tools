import { RANK_LABELS } from '../const'
import { concat } from '../functions/concat'
import { toConditions } from '../functions/to-conditions'
import { useAppState } from '../hooks/use-app-state'

const condStyles = 'border-[2px] rounded-lg w-32 h-full leading-[1.1]'
const rankStyles: Record<number, string> = {
	0: 'text-yellow-600 bg-yellow-300',
	1: 'text-zinc-500 bg-zinc-300',
}

export function Conditions() {
	const [state] = useAppState()

	return (
		<div className="flex justify-center gap-2 h-24">
			{toConditions(state).map((c, i) => c ? (
				<div key={i} className={concat('flex flex-col items-center', condStyles, rankStyles[i])}>
					<h1 className="text-center font-bold text-xl italic">{RANK_LABELS[i]}</h1>
					<div className="grow" />
					<ul>
						{c.directRon && (<li>{c.directRon.key} direct ron</li>)}
						{c.simpleRon && (<li>{c.simpleRon.key} ron</li>)}
						{c.tsumo && (<li>{c.tsumo.key} tsumo</li>)}
					</ul>
					<div className="grow" />
				</div>
			) : null)}
		</div>
	)
}