import { useId } from 'react'
import { List } from '@phosphor-icons/react'
import { useAppState } from '../hooks/use-app-state'
import { FlexLabel } from './flex-label'
import { Toggle } from './toggle'
import { Ton } from './ton'
import { RepeatCounter } from './repeat-counter'
import { Button } from './button'

export const iconStyle = 'transition duration-500 ease-in-out text-transparent group-data-checked:text-(--back)'

export function Controls() {
	const id = useId()
	const [state, actions] = useAppState()

	return (
		<div className="flex gap-8 items-center">
			<Button onClick={() => actions.setIsMenuOpen(true)}>
				<List size="2em" weight="thin" />
			</Button>
			<FlexLabel title="Relative">
				<Toggle checked={state.isDelta} onChange={actions.setIsDelta} />
			</FlexLabel>
			<FlexLabel title="Repeats" htmlFor={id}>
				<RepeatCounter id={id} />
			</FlexLabel>
			<FlexLabel title="Dealer">
				<Toggle checked={state.isDealer} onChange={actions.setIsDealer}>
					<Ton className={iconStyle} />
				</Toggle>
			</FlexLabel>
		</div>
	)
}



