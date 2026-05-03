import { ComponentPropsWithRef } from 'react'
import { concat } from '../functions/concat';

type DiscardLabelProps = ComponentPropsWithRef<'div'> & {
    shanten: number;
}

function named(shanten: number) {
    if (shanten === -1) return 'Complete'
    if (shanten === 0) return 'Tenpai'

    return `${shanten}-shanten`
}

export function DiscardLabel({ shanten, className, children, ...props }: DiscardLabelProps) {
    return (
        <div className={concat('flex-center flex-col gap-4', className)} {...props}>
            <h3 className="text-center font-bold">
                {named(shanten)}
            </h3>
            {children}
        </div>
    )
}

const headerStyle = 'text-center p-1 border-b'

export function DiscardHeader({ className, ...props }: ComponentPropsWithRef<'div'>) {
    return (<div className={concat(headerStyle, className)} {...props} />)
}
