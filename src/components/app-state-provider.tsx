import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { AppActions, AppState } from '../types'
import { AppContext } from '../context'

const initialState: AppState = {
	isDealer: false,
	isDelta: false,
	repeatCount: 0,
}

function bindActions(setState: Dispatch<SetStateAction<AppState>>) {
	const result: AppActions = {
		setIsDealer(isDealer) {
			setState(prev => ({ ...prev, isDealer, }))
		},
		setIsDelta(isDelta) {
			setState(prev => ({ ...prev, isDelta, }))
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

	return (
		<AppContext value={[state, actions]}>
			{children}
		</AppContext>
	)
}
