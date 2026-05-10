import { concat } from '../functions/concat';
import { Tile, TileSize } from './tile'

type Justify = 'start' | 'center' | 'end';

type TileListProps = {
    tiles: number[];
    size?: TileSize;
    wrap?: boolean;
    justify?: Justify;
    onClick?: (t: number) => void;
    isDisabled?: (t: number) => boolean;
}

const justifyStyle: Record<Justify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
}

const gapSize: Record<TileSize, string> = {
    'sm': 'gap-0.5',
    'md': 'gap-1',
}

export function TileList({ tiles, size = 'md', wrap, justify = 'center', onClick, isDisabled }: TileListProps) {
    function getHandler(t: number) {
        if (onClick) return () => onClick(t)
    }

    return (
        <div className={concat('flex', gapSize[size], wrap && 'flex-wrap', justifyStyle[justify])}>
            {tiles.map((t, i) => (
                <Tile
                    key={i}
                    t={t}
                    size={size}
                    onClick={getHandler(t)}
                    disabled={isDisabled?.(t)}
                />
            ))}
        </div>
    )
}
