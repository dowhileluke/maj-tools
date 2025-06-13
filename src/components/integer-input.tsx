import { ComponentProps } from 'react'
import { IntegerProps, useIntegerProps } from '../hooks/use-integer-props'

type IntegerInputProps = Omit<ComponentProps<'input'>, keyof IntegerProps> & IntegerProps

export function IntegerInput(props: IntegerInputProps) {
	return (
		<input {...useIntegerProps(props)} />
	)
}
