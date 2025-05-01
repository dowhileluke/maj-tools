import { concat } from '../functions/concat'
import { useAppState } from '../hooks/use-app-state'
import { Controls } from './controls'
import { MenuControls } from './menu-controls'
import { ScoreTable } from './score-table'

export function App() {
	const [{ isLightMode, isMenuOpen }] = useAppState()

	return (
		<div className="h-screen flex flex-col gap-4 justify-center items-center">
			{isMenuOpen ? (
				<>
					<img src="./qr.png" className={concat(isLightMode && 'invert')} alt="QR code" />
					<MenuControls />
				</>
			) : (
				<>
					<ScoreTable />
					<Controls />
				</>
			)}
		</div>
	)
}
