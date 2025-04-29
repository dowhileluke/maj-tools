import { Ton } from './ton'

export function App() {
	return (
		<div className="h-screen grid grid-rows-[1fr_auto]">
			<div>
				upper
			</div>
			<div className="bg-neutral-200 p-2 pb-inset-2 flex justify-center">
				<Ton className='h-32' />

			</div>
		</div>
	)
}
