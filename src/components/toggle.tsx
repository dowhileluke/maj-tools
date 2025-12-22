import { Switch, SwitchProps } from '@headlessui/react'

export function Toggle({ children, ...props}: SwitchProps) {
	return (
		<Switch
			{...props}
			className="group relative flex h-7 w-14 cursor-pointer ease-in-out"
		>
			{children instanceof Function ? children : (
				<>
					<div className="absolute h-full w-full border rounded-full group-data-checked:bg-mangan" />
					<span
						aria-hidden="true"
						className="pointer-events-none flex justify-center items-center size-5 m-1 translate-x-0 rounded-full bg-fore transition duration-200 ease-in-out group-data-checked:translate-x-7"
					>
						{children}
					</span>
				</>
			)}
		</Switch>
	)
}
