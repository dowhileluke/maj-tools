import { concat } from '../functions/concat'
import { useAppState } from '../hooks/use-app-state'
import { Controls } from './controls'
import { MenuControls } from './menu-controls'
import { Modal } from './modal'
import { ScoreTable } from './score-table'
import { DualPanel } from './dual-panel'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { CompassRose, IconProps, List, Table } from '@phosphor-icons/react'
import { Button } from './button'
import { Comparison } from './comparison'
import { Conditions } from './conditions'

export function App1() {
	const [{ isLightMode, isMenuOpen }, { setIsMenuOpen }] = useAppState()

	return (
		<div className={concat('h-screen flex flex-col gap-4 justify-center items-center', isMenuOpen && 'blur sm')}>
			<ScoreTable />
			<Controls version={1} />
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

const tabStyle = 'flex-center flex-col min-w-20 px-2 py-1 leading-none rounded-md outline-none data-[selected]:bg-back/60 condensed:p-1 condensed:min-w-auto'
const iconProps: IconProps = { size: '1.5rem', weight: 'thin', }

export function App() {
	const [{ isLightMode, isMenuOpen, isResetting }, { setIsMenuOpen }] = useAppState()
	const isModalOpen = isMenuOpen || isResetting

	return (
		<TabGroup
		className={concat(
			'flex flex-col condensed:flex-row',
			'w-full h-full overflow-hidden',
			isModalOpen && 'blur-sm',
		)}>
			<div className="shrink-0 pr-inset-0" />
			<TabPanels as="div" className="grow p-3 pb-inset-3 overflow-hidden">
				<TabPanel className="flex flex-col justify-center items-center h-full overflow-hidden">
					<div className="grow" />
					<ScoreTable />
					<div className="grow" />
					<Controls />
				</TabPanel>
				<TabPanel as={DualPanel} expand="below" className="gap-4">
					<Conditions />
					<Comparison />
				</TabPanel>
			</TabPanels>
			<TabList as="nav" className="shrink-0 bg-mangan text-sm p-1 pr-inset-1 pb-inset-1 gap-2 flex justify-center condensed:flex-col lg:order-first">
				<Tab className={tabStyle}>
					<Table {...iconProps} />
					<span className="condensed:hidden">Payment</span>
				</Tab>
				<Tab className={tabStyle}>
					<CompassRose {...iconProps} />
					<span className="condensed:hidden">Compare</span>
				</Tab>
				<Button className={tabStyle} onClick={() => setIsMenuOpen(true)}>
					<List {...iconProps} />
					<span className="condensed:hidden">Menu</span>
				</Button>
			</TabList>
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
		</TabGroup>
	)
}