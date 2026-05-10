import { Fragment } from 'react'
import { AdvancedUke, MultiUke, Ukeire } from '../functions/ukeire'
import { DiscardHeader } from './discard-header'
import { TileList } from './tile-list'

// 13 tiles at tenpai: show the wait
// 13 tiles otherwise: show the ukeire
// 14 tiles winning???
// 14 tiles at iishanten: show advanced ukeire
// 14 tiles otherwise: show uke groups

export type ResultMode = 
    | { mode: '13',   shanten: number, ukeire: Ukeire, }
    | { mode: '14@1', shanten: number, ukeire: AdvancedUke[], }
    | { mode: '14',   shanten: number, ukeire: MultiUke[], }

type DiscardTileProps = {
    results: ResultMode;
}

function ensure(tiles: number[]) {
    if (tiles.length < 1) return [0]

    return tiles
}

function goodCount(uke: AdvancedUke) {
    return (
        <span>
            ({uke.goodCount})
        </span>
    )
}

export function DiscardTiles({ results }: DiscardTileProps) {
    const heading = results.shanten === 0 ? 'Winning Tiles' : 'Accepted Tiles'

    if (results.mode === '13') {
        return (
            <div className="flex flex-col gap-1">
                <DiscardHeader>{heading}</DiscardHeader>
                <TileList size="sm" wrap tiles={results.ukeire.tiles} />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-[auto_auto_auto] gap-x-4 gap-y-1 ">
            <DiscardHeader>Drop</DiscardHeader>
            <DiscardHeader className="col-span-2">
                {heading}
            </DiscardHeader>
            {results.ukeire.map(({ discards, count, tiles }, i) => (
                <Fragment key={discards[0]}>
                    <TileList size="sm" tiles={discards} />
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        {count}x
                        {results.mode === '14@1' && goodCount(results.ukeire[i])}
                    </div>
                    {results.mode === '14@1' ? (
                        <div className="flex items-center gap-1">
                            <TileList
                                size="sm"
                                tiles={ensure(results.ukeire[i].goodTiles)}
                            />
                            <span>&middot;</span>
                            <TileList
                                size="sm"
                                tiles={ensure(results.ukeire[i].remaining)}
                            />
                        </div>
                    ) : (
                        <TileList
                            size="sm"
                            tiles={tiles}
                            justify="start"
                        />
                    )}
                </Fragment>
            ))}
        </div>
    )
}
