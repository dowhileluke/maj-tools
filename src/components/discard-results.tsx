import { useMemo } from 'react'
import { shanten as shantenFn } from '../functions/shanten'
import { useAppState } from '../hooks/use-app-state'
import { groupedUke, MultiUke } from '../functions/ukeire'
import { Tile } from './tile'
import { TileList } from './tile-list'

type DiscardResultProps = {
    hand: number[];
}

type Results = {
    shanten: number;
    ukeOutcomes: MultiUke[];
}

export function DiscardResults({ hand }: DiscardResultProps) {
    const [state, actions] = useAppState()
    const len = state.tiles.length

    const results = useMemo(() => {
        if (len < 13) return null

        const shanten = shantenFn(hand)
        const groups = groupedUke(hand, shanten)
        const ukeOutcomes = groups.sort((a, b) => b.count - a.count)
        const results: Results = { shanten, ukeOutcomes }

        console.log(results)
        
        return results
    }, [len, hand])

    if (!results) return (<div />)

    return (
        <div className="flex-center flex-col gap-1">
            {results.ukeOutcomes.map(({ t, count, tiles }) => (
                <div key={t} className="flex justify-between">
                    <Tile t={t} />
                    <div>{count}</div>
                    <TileList
                        size="sm"
                        tiles={tiles}
                        onClick={(upgrade) => {
                            actions.removeTile(t)
                            actions.addTile(upgrade)
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
