import { ComponentPropsWithRef } from 'react'
import { concat } from '../functions/concat';

const headerStyle = 'text-center pb-1 border-b'

export function DiscardHeader({ className, ...props }: ComponentPropsWithRef<'div'>) {
    return (<div className={concat(headerStyle, className)} {...props} />)
}
