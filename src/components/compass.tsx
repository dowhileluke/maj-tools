import { useId } from 'react'
import { generateArray } from '@dowhileluke/fns'
import { concat } from '../functions/concat'
import { Ton } from './ton'

type CompassProps = {
	value: number;
	onChange?: (value: number) => void;
	className?: string;
}

export function Compass({ value, onChange, className }: CompassProps) {
	const id = useId()

	return (
		<div className={concat('compass', className)}>
			{generateArray(4, n => (
				<label
					key={n}
					className={concat(
						"flex justify-center items-center size-5 border rounded-full cursor-pointer",
						value === n && 'bg-fore',
					)}
				>
					{value === n && (<Ton className="block text-back" />)}
					<input
						type="radio"
						name={id}
						value={n}
						onChange={() => onChange?.(n)}
						checked={value === n}
						className='size-0 appearance-none'
					/>
				</label>
			))}
		</div>
	)
}
