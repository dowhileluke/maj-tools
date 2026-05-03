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

export function TileList({ tiles, size, wrap, justify = 'center', onClick, isDisabled }: TileListProps) {
    function getHandler(t: number) {
        if (onClick) return () => onClick(t)
    }

    return (
        <div className={concat('flex gap-1', wrap && 'flex-wrap', justifyStyle[justify])}>
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
