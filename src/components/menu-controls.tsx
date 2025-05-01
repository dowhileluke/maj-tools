import { Lightbulb, X } from '@phosphor-icons/react'
import { useAppState } from '../hooks/use-app-state'
import { FlexLabel } from './flex-label'
import { Toggle } from './toggle'
import { Button } from './button'
import { iconStyle } from './controls'

export function MenuControls() {
	const [state, actions] = useAppState()

	return (
		<div className="flex gap-8 items-center">
			<Button onClick={() => actions.setIsMenuOpen(false)}>
				<X size="2em" weight="thin" />
			</Button>
			<FlexLabel title="Light Mode">
				<Toggle checked={state.isLightMode} onChange={actions.setIsLightMode}>
					<Lightbulb size="1em" className={iconStyle} />
				</Toggle>
			</FlexLabel>
		</div>
	)
}



