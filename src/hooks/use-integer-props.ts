import { ChangeEventHandler, useState } from 'react'

export type IntegerProps = {
	value: number | null;
	onChange: (value: number | null) => void;
}

type InputProps = {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	inputMode: 'decimal';
}

const NON_DIGITS = /\D/g
const DECIMAL_DIVIDER = (0.1).toLocaleString().charAt(1) // enables negative values with decimal keyboard
const NEGATIVE_SYMBOLS = ['-', DECIMAL_DIVIDER, '(']

function toDigits(s: string) {
	const isNegative = s.startsWith('-')
	const text = isNegative ? s.slice(1) : s
	const isInverted = NEGATIVE_SYMBOLS.some(sym => text.includes(sym))
	const digits = s.replace(NON_DIGITS, '')

	return isNegative !== isInverted ? '-' + digits : digits
}

function toTextValue(n: number | null, isNakedMinus: boolean) {
	if (n === null) {
		return isNakedMinus ? '-' : ''
	}

	return n.toString()
}

export function useIntegerProps<T extends IntegerProps>({ value, onChange, ...props }: T) {
	const [isNakedMinus, setIsNakedMinus] = useState(false)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const digits = toDigits(e.target.value)
		const isMinus = digits === '-'
		const isNull = isMinus || digits === ''

		setIsNakedMinus(isMinus)
		onChange(isNull ? null : parseInt(digits, 10))
	}

	const result: Omit<T, keyof IntegerProps> & InputProps = {
		...props,
		value: toTextValue(value, isNakedMinus),
		onChange: handleChange,
		inputMode: 'decimal',
	}

	return result
}
