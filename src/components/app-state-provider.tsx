import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import { AppActions, AppState } from '../types'
import { AppContext } from '../context'
import { BG_HEX_CODE } from '../const'
import { getPersistedState, setPersistedState } from '../functions/persist'

const initialState: AppState = {
	isDealer: false,
	isDelta: false,
	isLightMode: false,
	isMenuOpen: false,
	repeatCount: 0,
	...getPersistedState(),
}

function bindActions(setState: Dispatch<SetStateAction<AppState>>) {
	const result: AppActions = {
		setIsDealer(isDealer) {
			setState(prev => ({ ...prev, isDealer, }))
		},
		setIsDelta(isDelta) {
			setState(prev => ({ ...prev, isDelta, }))
		},
		setIsLightMode(isLightMode) {
			setState(prev => ({ ...prev, isLightMode, }))
		},
		setIsMenuOpen(isMenuOpen) {
			setState(prev => ({ ...prev, isMenuOpen, }))
		},
		setRepeatCount(repeatCount) {
			setState(prev => ({ ...prev, repeatCount, }))
		},
	}

	return result
}

export function AppStateProvider({ children }: PropsWithChildren) {
	const [state, setState] = useState(initialState)
	const [actions] = useState(() => bindActions(setState))
	const { isLightMode } = state

	useEffect(() => {
		document.documentElement.classList.toggle('light', isLightMode)

		setPersistedState({ isLightMode })
	}, [isLightMode])

	return (
		<AppContext value={[state, actions]}>
			<meta name="theme-color" content={isLightMode ? 'white' : BG_HEX_CODE} />
			{children}
		</AppContext>
	)
}
