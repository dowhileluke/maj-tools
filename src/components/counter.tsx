import { ComponentProps } from 'react'
import { Plus, X } from '@phosphor-icons/react'
import { generateArray } from '@dowhileluke/fns'
import { concat } from '../functions/concat'
import { useAppState } from '../hooks/use-app-state'
import { Replace } from '../types'
import { Button } from './button'

const MAX_REPEAT = 50

const opts = generateArray(0, MAX_REPEAT, n => (
	<option key={n} value={n}>{n}</option>
))

const buttonStyle = 'h-7 w-8 border'

type CounterProps = {
	value: number;
	onChange: (value: number) => void;
}

export function Counter({ value, onChange, ...props }: Replace<ComponentProps<'select'>, CounterProps>) {
	return (
		<div className="flex h-7">
			<Button
				type="button"
				onClick={() => onChange(0)}
				disabled={!value}
				className={concat(buttonStyle, 'rounded-l-full border-r-0')}
			>
				<X size="1em" />
			</Button>
			<select
				{...props}
				value={value}
				onChange={e => onChange(Number(e.target.value))}
				className={concat('appearance-none cursor-pointer px-2 border text-center leading-none', value ? 'bg-mangan' : 'bg-(--back)')}
			>
				{opts}
			</select>
			<Button
				type="button"
				onClick={() => onChange(value + 1)}
				disabled={value >= MAX_REPEAT}
				className={concat(buttonStyle, 'rounded-r-full border-l-0')}
			>
				<Plus size="1em" />
			</Button>
		</div>
	)
}

export function RepeatCounter(props: ComponentProps<'select'>) {
	const [{ repeatCount = 0 }, { setRepeatCount }] = useAppState()

	return (
		<Counter {...props} value={repeatCount} onChange={setRepeatCount} />
	)
}

export function LeftoverCounter(props: ComponentProps<'select'>) {
	const [{ leftoverCount = 0 }, { setLeftoverCount }] = useAppState()

	return (
		<Counter {...props} value={leftoverCount} onChange={setLeftoverCount} />
	)
}
