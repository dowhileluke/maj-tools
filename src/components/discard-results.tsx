import { useMemo } from "react";
import { shanten as shantenFn } from "../functions/shanten";
import { useAppState } from "../hooks/use-app-state";
import { groupedUke, Ukeire } from "../functions/ukeire";
import { Tile } from "./tile";
import { TileList } from "./tile-list";

type DiscardResultProps = {
    hand: number[];
}

function organize(groups: Ukeire[]) {
    const indexed = groups.map(([uke, tiles], n) => ([n, uke, tiles] as const))
    const filtered = indexed.filter(g => g[1])
    const sorted = filtered.sort((a, b) => b[1] - a[1])

    return sorted
}

type Results = {
    shanten: number;
    ukeOutcomes: ReturnType<typeof organize>;
}

export function DiscardResults({ hand }: DiscardResultProps) {
    const [state] = useAppState()
    const len = state.tiles.length

    const results = useMemo(() => {
        if (len < 13) return null

        const shanten = shantenFn(hand)
        const groups = groupedUke(hand, shanten) as Ukeire[]
        const ukeOutcomes = organize(groups)
        const results: Results = { shanten, ukeOutcomes }

        console.log(results)
        
        return results
    }, [len, hand])

    if (!results) return (<div />)

    return (
        <div className="flex-center flex-col gap-1">
            {results.ukeOutcomes.map(([n, uke, tiles]) => (
                <div key={n} className="flex justify-between">
                    <Tile n={n} />
                    <div>{uke}</div>
                    <TileList size="sm" tiles={tiles} />
                </div>
            ))}
        </div>
    )
}
