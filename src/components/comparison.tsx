import { useId, useState } from 'react'
import { Eraser, User, UserSwitch } from '@phosphor-icons/react'
import { generateArray } from '@dowhileluke/fns'
import { concat } from '../functions/concat'
import { toRankedDeltas } from '../functions/to-ranked-deltas'
import { useAppState } from '../hooks/use-app-state'
import { RANK_LABELS } from '../const'
import { Button } from './button'
import { Compass } from './compass'
import { LeftoverCounter, RepeatCounter } from './counter'
import { FlexLabel } from './flex-label'
import { IntegerInput } from './integer-input'
import { Modal } from './modal'
import { Toggle } from './toggle'

const labels = ['POV', 'Shimocha', 'Toimen', 'Kamicha']

const inputStyle = "border rounded-sm text-center w-24"
const buttonStyle = "rounded-lg px-2 py-1 gap-1"
const destroyStyle = concat(buttonStyle, 'bg-red-700 text-white')

function signed(n: number | null) {
	if (n === null) return null
	if (n < 0) return n

	return '+' + n
}

export function Comparison() {
	const repeatId = useId()
	const letftoverId = useId()
	const [state, actions] = useAppState()
	const [value, setValue] = useState<number | null>(null)
	const rankedDeltas = toRankedDeltas(state.scores)

	return (
		<div className="flex-center flex-col gap-4">
			<div className="grow" />
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
							className={inputStyle}
						/>
						{i > 0 && (
							<div className="text-center text-xs leading-none">
								{signed(rankedDeltas[i].delta)}
							</div>
						)}
					</div>
				))}
				<Compass value={state.dealerIndex} onChange={actions.setDealerIndex} />
				<Button className={destroyStyle} onClick={() => actions.setIsResetting(true)}>
					<Eraser />
					Reset
				</Button>
			</div>
			<div className="grow" />
			<div className="flex-center gap-4">
				<FlexLabel title="Simple fu">
					<Toggle checked={state.isSimpleFu} onChange={actions.setIsSimpleFu} />
				</FlexLabel>
				<FlexLabel title="Repeats" htmlFor={repeatId}>
					<RepeatCounter id={repeatId} />
				</FlexLabel>
				<FlexLabel title="Leftovers" htmlFor={letftoverId}>
					<LeftoverCounter id={letftoverId} />
				</FlexLabel>
			</div>
			<Modal
				open={state.isResetting}
				onClose={() => actions.setIsResetting(false)}
				className="flex-center flex-col gap-8"
			>
				<h3 className="text-xl font-bold">Reset all scores?</h3>
				<IntegerInput
					value={value}
					onChange={setValue}
					className={inputStyle}
					placeholder="(blank)"
				/>
				<div className="flex gap-4">
					<Button className={buttonStyle} onClick={() => actions.setIsResetting(false)}>Cancel</Button>
					<Button className={destroyStyle} onClick={() => actions.resetComparison(value)}>Reset</Button>
				</div>
			</Modal>
		</div>
	)
}