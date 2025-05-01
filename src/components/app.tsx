import { useAppState } from '../hooks/use-app-state'
import { ScoreTable } from './score-table'

export function App() {
	const [state, actions] = useAppState()

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<ScoreTable />
			<button onClick={() => actions.setIsDealer(!state.isDealer)}>isDealer: {String(state.isDealer)}</button>
			<button onClick={() => actions.setIsDelta(!state.isDelta)}>isDelta: {String(state.isDelta)}</button>
		</div>
	)
}
