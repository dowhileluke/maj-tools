import { ArrowSquareOut, Lightbulb } from '@phosphor-icons/react'
import { useAppState } from '../hooks/use-app-state'
import { FlexLabel } from './flex-label'
import { Toggle } from './toggle'
import { iconStyle } from './controls'

export function MenuControls() {
	const [state, actions] = useAppState()

	return (
		<div className="flex gap-8 justify-center items-center landscape:flex-col">
			<FlexLabel title="Support Me">
				<a
					href="https://ko-fi.com/dowhileluke"
					target="_blank"
					className="h-7 px-2 py-1 border cursor-pointer rounded-full flex items-center gap-1 text-white bg-orange-600 border-(--fore)"
				>
					<img src="./kofi.png" alt="Ko-fi logo" className="h-full" />
					on Ko-fi
					<ArrowSquareOut size="1em" />
				</a>
			</FlexLabel>
			<FlexLabel title="Light Mode">
				<Toggle checked={state.isLightMode} onChange={actions.setIsLightMode}>
					<Lightbulb size="1em" className={iconStyle} />
				</Toggle>
			</FlexLabel>
		</div>
	)
}



