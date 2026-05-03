import { Fragment, useMemo } from 'react'
import { shanten as shantenFn } from '../functions/shanten'
import { useAppState } from '../hooks/use-app-state'
import { AdvancedUke, groupedUke, MultiUke, ukeire as ukeireFn, Ukeire } from '../functions/ukeire'
import { TileList } from './tile-list'
import { DiscardHeader, DiscardLabel } from './discard-label'

type DiscardResultProps = {
    hand: number[];
}

// 13 tiles at tenpai: show the wait
// 13 tiles otherwise: show the ukeire
// 14 tiles winning???
// 14 tiles at iishanten: show advanced ukeire
// 14 tiles otherwise: show uke groups

type ResultMode = 
    | { mode: '13',   shanten: number, ukeire: Ukeire, }
    | { mode: '14@1', shanten: number, ukeire: AdvancedUke[], }
    | { mode: '14',   shanten: number, ukeire: MultiUke[], }

function sorted<T extends MultiUke>(list: T[]) {
    return list.sort((a, b) => b.count - a.count)
}

function ensure(tiles: number[]) {
    if (tiles.length < 1) return [0]

    return tiles
}

export function DiscardResults({ hand }: DiscardResultProps) {
    const [state] = useAppState()
    const len = state.tiles.length

    const results = useMemo(() => {
        if (len < 13) return null

        const shanten = shantenFn(hand)

        if (len == 13) {
            const result: ResultMode = {
                mode: '13',
                shanten,
                ukeire: ukeireFn(hand, undefined, shanten),
            }

            return result
        }

        const ukeire = sorted(groupedUke(hand, shanten)) as AdvancedUke[]

        if (shanten == 1) {
            const result: ResultMode = {
                mode: '14@1',
                shanten,
                ukeire, 
            }

            return result
        }

        const result: ResultMode = {
            mode: '14',
            shanten,
            ukeire, 
        }

        return result
    }, [len, hand])

    if (!results) {
        return (
            <div />
        )
    }

    if (results.mode === '13') {
        return (
            <DiscardLabel className="w-full overflow-hidden" shanten={results.shanten}>
                <TileList size="sm" wrap tiles={results.ukeire.tiles} />
            </DiscardLabel>
        )
    }

    if (results.shanten === -1) {
        return (
            <DiscardLabel shanten={-1} />
        )
    }

    return (
        <div className="grid justify-center items-center overflow-hidden">
            <DiscardLabel className="w-full overflow-hidden" shanten={results.shanten}>
                <div className="w-full overflow-auto touch-pan-xy">
                    <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-1 ">
                        <DiscardHeader>Discard</DiscardHeader>
                        <DiscardHeader className="col-span-2">Accepted Tiles</DiscardHeader>
                        {results.ukeire.map(({ discards, count, tiles }, i) => (
                            <Fragment key={discards[0]}>
                                <TileList size="sm" tiles={discards} />
                                <div className="flex-center whitespace-nowrap">
                                    {count}
                                    {results.mode === '14@1' && (
                                        ' (' + results.ukeire[i].goodCount + ')'
                                    )}
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
                                    />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </DiscardLabel>
        </div>
    )
}
