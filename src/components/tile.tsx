import { ComponentPropsWithRef } from 'react'
import { concat } from '../functions/concat';
import { generateArray } from '@dowhileluke/fns';

export type TileSize = 'sm' | 'md'

type TileProps = {
    t: number;
    size?: TileSize;
}

const suits = 'mpsz'.split('')
const names = generateArray(38, t => {
    const n = t % 10

    if (!n) return ''

    const s = Math.floor(t / 10)

    return `${n}${suits[s]}`
})

const baseStyle = 'shrink-0 p-[2px] text-neutral-800 font-bold border rounded-sm active:opacity-80 disabled:opacity-40'
const emptyStyle = concat(baseStyle, 'border-dashed border-fore')
const primaryStyle = concat(baseStyle, 'flex-center bg-white border-neutral-800')

const sizeMap: Record<TileSize, string> = {
    sm: 'w-5 h-6',
    md: 'text-xl w-8 h-10',
}

export function Tile({ t, size = 'md', className, children, ...props }: TileProps & ComponentPropsWithRef<'button'>) {
    const rank = t % 10

    if (rank === 0) {
        return (
            <div className={concat(emptyStyle, sizeMap[size], className)}>
                {children}
            </div>
        )
    }

    const name = names[t]
    const label = children || (
        <img
            src={`./tiles/${name}.svg`}
            alt={name}
        />
    )
    const cursor = props.onClick && !props.disabled && 'cursor-pointer'

    return (
        <button className={concat(primaryStyle, sizeMap[size], !name && 'bg-yellow-500', className, cursor)} {...props}>
            {label}
        </button>
    )
}
