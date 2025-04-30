import { useContext } from 'react'
import { AppContext } from '../context'

export function useAppState() {
	const ctxValue = useContext(AppContext)

	if (!ctxValue) throw new Error('AppStateProvider is missing!')

	return ctxValue
}
