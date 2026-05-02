import { ComponentPropsWithRef } from 'react'
import { concat } from '../functions/concat';

export type TileSize = 'sm' | 'md'

type TileProps = {
    t: number;
    size?: TileSize;
}

const baseStyle = 'font-bold border rounded-sm active:opacity-80 disabled:opacity-40'
const emptyStyle = concat(baseStyle, 'border-dashed border-fore')
const primaryStyle = concat(baseStyle, 'flex-center bg-white border-neutral-800')

const sizeMap: Record<TileSize, string> = {
    sm: 'w-5 h-6',
    md: 'text-xl w-8 h-10',
}

const baseColor = ['text-red-700', 'text-blue-700', 'text-green-700', 'text-neutral-800']
const dragonColor: Record<number, string> = {
    35: 'text-white',
    36: 'text-green-700',
    37: 'text-red-700',
}

const honorLabels = '?ESWNHGR'

export function Tile({ t, size = 'md', className, children, ...props }: TileProps & ComponentPropsWithRef<'button'>) {
    const rank = t % 10

    if (rank === 0) {
        return (
            <div className={concat(emptyStyle, sizeMap[size], className)}>
                {children}
            </div>
        )
    }

    const label = children || (t > 30 ? honorLabels.charAt(rank) : rank)
    const color = dragonColor[t] || baseColor[Math.floor(t / 10)]
    const cursor = props.onClick && !props.disabled && 'cursor-pointer'

    return (
        <button className={concat(primaryStyle, sizeMap[size], color, className, cursor)} {...props}>
            {label}
        </button>
    )
}
