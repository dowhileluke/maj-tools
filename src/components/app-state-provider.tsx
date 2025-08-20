import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import { generateArray, split } from '@dowhileluke/fns'
import { AppActions, AppState } from '../types'
import { AppContext } from '../context'
import { BG_HEX_CODE } from '../const'
import { getPersistedState, setPersistedState } from '../functions/persist'

const initialState: AppState = {
	isDealer: false,
	isDelta: false,
	isLightMode: false,
	isMenuOpen: false,
	isResetting: false,
	scores: [null, null, null, null],
	dealerIndex: 0,
	repeatCount: 0,
	leftoverCount: 0,
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
		setLeftoverCount(leftoverCount) {
			setState(prev => ({ ...prev, leftoverCount, }))
		},
		setDealerIndex(dealerIndex) {
			setState(prev => ({ ...prev, dealerIndex, }))
		},
		setScore(index, score) {
			setState(prev => ({
				...prev,
				scores: prev.scores.map((n, i) => i === index ? score : n)
			}))
		},
		setPovIndex(index) {
			setState(prev => {
				const [head, tail] = split(prev.scores, index)

				return {
					...prev,
					scores: tail.concat(head),
					dealerIndex: (prev.dealerIndex + 4 - index) % 4,
				}
			})
		},
		setIsResetting(isResetting) {
			setState(prev => ({ ...prev, isResetting, }))
		},
		resetComparison(score) {
			setState(prev => ({
				...prev,
				scores: generateArray(4, () => score),
				isResetting: false,
			}))
		},
	}

	return result
}

export function AppStateProvider({ children }: PropsWithChildren) {
	const [state, setState] = useState(initialState)
	const [actions] = useState(() => bindActions(setState))
	const { isLightMode, scores } = state

	useEffect(() => {
		document.documentElement.classList.toggle('light', isLightMode)
	}, [isLightMode])
	

	useEffect(() => {
		setPersistedState({ isLightMode, scores })
	}, [isLightMode, scores])

	return (
		<AppContext value={[state, actions]}>
			<meta name="theme-color" content={isLightMode ? 'white' : BG_HEX_CODE} />
			{children}
		</AppContext>
	)
}
