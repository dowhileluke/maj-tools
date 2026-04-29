import { ComponentPropsWithRef, ReactNode } from 'react'
import { concat } from '../functions/concat';

type Size = 'sm' | 'md'

type TileProps = {
    rank: number;
    suit: number;
    size?: Size;
    children?: ReactNode;
}

const text = ['text-red-700', 'text-blue-700', 'text-green-700', 'text-neutral-800']
const honors = '?ESWNHGR'
const dragons: Record<number, string> = {
    5: 'text-white',
    6: 'text-green-700',
    7: 'text-red-700',
}

const baseStyle = 'text-center border rounded-sm disabled:opacity-50'
const outlineStyle = concat(baseStyle, 'border-dashed border-fore')
const tileStyle = concat(baseStyle, 'bg-white font-bold border-neutral-800 cursor-pointer')
const sizes: Record<Size, string> = {
    sm: 'w-5 h-6',
    md: 'text-lg w-8 h-10',
}

export function Tile({ rank, suit, size = 'md', className, children, ...rest }: TileProps & ComponentPropsWithRef<'button'>) {
    if (rank === 0) {
        return (
            <div className={concat(outlineStyle, sizes[size])}>
                {children}
            </div>
        )
    }

    const label = children || (suit > 2 ? honors.charAt(rank) : rank)
    const color = suit > 2 && dragons[rank] || text[suit]

    return (
        <button className={concat(tileStyle, sizes[size], color, className)} {...rest}>
            {label}
        </button>
    )
}
