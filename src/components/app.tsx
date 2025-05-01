import { Controls } from './controls'
import { ScoreTable } from './score-table'

export function App() {
	return (
		<div className="h-screen flex flex-col gap-4 justify-center items-center">
			<ScoreTable />
			<Controls />
		</div>
	)
}
