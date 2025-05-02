import { concat } from '../functions/concat'
import { useAppState } from '../hooks/use-app-state'
import { Controls } from './controls'
import { MenuControls } from './menu-controls'
import { Modal } from './modal'
import { ScoreTable } from './score-table'

export function App() {
	const [{ isLightMode, isMenuOpen }, { setIsMenuOpen }] = useAppState()

	return (
		<div className="h-screen flex flex-col gap-4 justify-center items-center">
			<ScoreTable />
			<Controls />
			<Modal
				open={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				className="flex flex-col justify-center items-center gap-8 landscape:flex-row"
			>
				<img
					src="./qr.png"
					width="232"
					alt="QR code"
					className={concat('pixelated', isLightMode && 'invert')}
				/>
				<MenuControls />
			</Modal>
		</div>
	)
}
