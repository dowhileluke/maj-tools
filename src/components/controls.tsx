import { useAppState } from '../hooks/use-app-state'
import { FlexLabel } from './flex-label'
import { Toggle } from './toggle'
import { Ton } from './ton'

const iconStyle = 'transition duration-500 ease-in-out text-transparent group-data-checked:text-(--back)'

export function Controls() {
	const [state, actions] = useAppState()

	return (
		<div className="flex gap-8">
		<FlexLabel title="Light Mode">
			<Toggle checked={state.isLightMode} onChange={actions.setIsLightMode} />
		</FlexLabel>
			<FlexLabel title="Relative">
				<Toggle checked={state.isDelta} onChange={actions.setIsDelta} />
			</FlexLabel>
			<FlexLabel title="Dealer">
				<Toggle checked={state.isDealer} onChange={actions.setIsDealer}>
					<Ton className={iconStyle} />
				</Toggle>
			</FlexLabel>
		</div>
	)
}
