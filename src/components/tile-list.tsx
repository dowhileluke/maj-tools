import { Tile, TileSize } from './tile'

type TileListProps = {
    tiles: number[];
    size?: TileSize;
    onClick?: (n: number) => void;
    isDisabled?: (n: number) => boolean;
}

export function TileList({ tiles, size, onClick, isDisabled }: TileListProps) {
    function getHandler(t: number) {
        if (onClick) return () => onClick(t)
    }

    return (
        <div className="flex-center gap-1">
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
