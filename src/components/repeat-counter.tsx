import { Plus, X } from '@phosphor-icons/react'
import { generateArray } from '@dowhileluke/fns'
import { useAppState } from '../hooks/use-app-state'
import { concat } from '../functions/concat'
import { ComponentProps } from 'react'
import { Button } from './button'

const MAX_REPEAT = 50

const opts = generateArray(0, MAX_REPEAT, n => (
	<option key={n} value={n}>{n}</option>
))

const buttonStyle = 'h-7 w-8 border'

export function RepeatCounter(props: ComponentProps<'select'>) {
	const [{ repeatCount }, { setRepeatCount }] = useAppState()

	return (
		<div className="flex h-7">
			<Button
				type="button"
				onClick={() => setRepeatCount(0)}
				disabled={!repeatCount}
				className={concat(buttonStyle, 'rounded-l-full border-r-0')}
			>
				<X size="1em" />
			</Button>
			<select
				{...props}
				value={repeatCount}
				onChange={e => setRepeatCount(Number(e.target.value))}
				className={concat('appearance-none cursor-pointer px-2 border text-center leading-none', repeatCount ? 'bg-mangan' : 'bg-(--back)')}
			>
				{opts}
			</select>
			<Button
				type="button"
				onClick={() => setRepeatCount(repeatCount + 1)}
				disabled={repeatCount >= MAX_REPEAT}
				className={concat(buttonStyle, 'rounded-r-full border-l-0')}
			>
				<Plus size="1em" />
			</Button>
		</div>
	)
}