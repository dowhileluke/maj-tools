import { RANK_LABELS } from '../const'
import { toConditions } from '../functions/to-conditions'
import { useAppState } from '../hooks/use-app-state'

export function Conditions() {
	const [state] = useAppState()

	return (
		<div className="flex justify-center h-20">
			{toConditions(state).map((c, i) => c ? (
				<div className="border-l first:border-none border-dotted px-3">
					<h1 className="w-32 text-center text-xl italic">{RANK_LABELS[i]}</h1>
					{c.simpleRon && (<div>{c.simpleRon.key} ron</div>)}
					{c.directRon && (<div>{c.directRon.key} direct ron</div>)}
					{c.tsumo && (<div>{c.tsumo.key} tsumo</div>)}
				</div>
			) : null)}
		</div>
	)
}