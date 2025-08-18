import { generateArray } from '@dowhileluke/fns'
import { useAppState } from '../hooks/use-app-state'
import { Compass } from './compass'
import { IntegerInput } from './integer-input'
import { User, UserSwitch } from '@phosphor-icons/react'
import { toRankedDeltas } from '../functions/to-ranked-deltas'
import { RANK_LABELS } from '../const'
import { LeftoverCounter, RepeatCounter } from './counter'
import { FlexLabel } from './flex-label'
import { useId } from 'react'

const labels = ['POV', 'Shimocha', 'Toimen', 'Kamicha']

function signed(n: number | null) {
	if (n === null) return null
	if (n < 0) return n

	return '+' + n
}

export function Comparison() {
	const repeatId = useId()
	const letftoverId = useId()
	const [state, actions] = useAppState()
	const rankedDeltas = toRankedDeltas(state.scores)

	return (
		<div className="compass gap-4">
			{generateArray(4, i => (
				<div key={i} className="grid grid-rows-[1fr_auto_1fr] gap-1">
					<div className="flex gap-1 text-xs leading-none">
						{i === 0 ? (<User weight="fill" />) : (
							<UserSwitch
								weight="fill"
								className="cursor-pointer"
								onClick={() => actions.setPovIndex(i)}
							/>
						)}
						{labels[i]}
						{rankedDeltas[i].rankIndex !== null && state.scores[i] !== null && (
							<> &middot; {RANK_LABELS[rankedDeltas[i].rankIndex]}</>
						)}
					</div>
					<IntegerInput
						key={i}
						value={state.scores[i]}
						onChange={n => actions.setScore(i, n)}
						className="border rounded-sm text-center w-24"
					/>
					{i > 0 && (
						<div className="text-center text-xs leading-none">
							{signed(rankedDeltas[i].delta)}
						</div>
					)}
				</div>
			))}
			<Compass value={state.dealerIndex} onChange={actions.setDealerIndex} />
			<FlexLabel title="Repeats" htmlFor={repeatId}>
				<RepeatCounter id={repeatId} />
			</FlexLabel>
			<FlexLabel title="Leftovers" htmlFor={letftoverId}>
				<LeftoverCounter id={letftoverId} />
			</FlexLabel>
		</div>
	)
}