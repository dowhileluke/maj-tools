import { useMemo } from 'react'
import { shanten as shantenFn } from '../functions/shanten'
import { useAppState } from '../hooks/use-app-state'
import { groupedUke, MultiUke } from '../functions/ukeire'
import { TileList } from './tile-list'

type DiscardResultProps = {
    hand: number[];
}

type Results = {
    shanten: number;
    ukeOutcomes: MultiUke[];
}

// 13 tiles at tenpai: show the wait
// 13 tiles otherwise: show the ukeire
// 14 tiles winning???
// 14 tiles at iishanten: show advanced ukeire
// 14 tiles otherwise: show uke groups

export function DiscardResults({ hand }: DiscardResultProps) {
    const [state, actions] = useAppState()
    const len = state.tiles.length

    const results = useMemo(() => {
        if (len < 13) return null

        const shanten = shantenFn(hand)

        if (len == 13) return null

        const groups = groupedUke(hand, shanten)
        const ukeOutcomes = groups.sort((a, b) => b.count - a.count)
        const results: Results = { shanten, ukeOutcomes }

        console.log(results)
        
        return results
    }, [len, hand])

    if (!results) return (<div />)

    return (
        <div className="flex flex-col gap-1 h-full overflow-auto">
            {results.ukeOutcomes.map(({ discards, count, tiles }) => (
                <div key={discards[0]} className="flex justify-between">
                    <TileList size="sm" tiles={discards} />
                    <div>{count}</div>
                    <TileList
                        size="sm"
                        tiles={tiles}
                        onClick={(upgrade) => {
                            actions.removeTile(discards[0])
                            actions.addTile(upgrade)
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
