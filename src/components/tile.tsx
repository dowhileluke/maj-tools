import { ComponentPropsWithRef } from 'react'
import { concat } from '../functions/concat';

export type TileSize = 'sm' | 'md'

type TileProps = {
    n: number;
    size?: TileSize;
}

const baseStyle = 'font-bold border rounded-sm disabled:opacity-50'
const emptyStyle = concat(baseStyle, 'border-dashed border-fore')
const primaryStyle = concat(baseStyle, 'flex-center bg-white border-neutral-800 cursor-pointer')

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

export function Tile({ n, size = 'md', className, children, ...rest }: TileProps & ComponentPropsWithRef<'button'>) {
    const rank = n % 10

    if (rank === 0) {
        return (
            <div className={concat(emptyStyle, sizeMap[size], className)}>
                {children}
            </div>
        )
    }

    const label = children || (n > 30 ? honorLabels.charAt(rank) : rank)
    const color = dragonColor[n] || baseColor[Math.floor(n / 10)]

    return (
        <button className={concat(primaryStyle, sizeMap[size], color, className)} {...rest}>
            {label}
        </button>
    )
}
