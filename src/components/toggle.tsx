import { Switch, SwitchProps } from '@headlessui/react'

export function Toggle({ children, ...props}: SwitchProps) {
  return (
    <Switch
			{...props}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full outline p-1 ease-in-out data-checked:bg-mangan"
    >
			{children instanceof Function ? children : (
				<span
					aria-hidden="true"
					className="pointer-events-none flex justify-center items-center size-5 translate-x-0 rounded-full bg-fore transition duration-200 ease-in-out group-data-checked:translate-x-7"
				>
					{children}
				</span>
			)}
    </Switch>
  )
}
