import { useMemo } from 'react'
import { shanten as shantenFn } from '../functions/shanten'
import { useAppState } from '../hooks/use-app-state'
import { AdvancedUke, groupedUke, MultiUke, ukeire as ukeireFn } from '../functions/ukeire'
import { DiscardTiles, ResultMode } from './discard-tiles'
import { concat } from '../functions/concat'

type DiscardResultProps = {
    hand: number[];
}

function sorted<T extends MultiUke>(list: T[]) {
    return list.sort((a, b) => b.count - a.count)
}

function named(shanten: number) {
    if (shanten === -1) return 'Complete'
    if (shanten === 0) return 'Tenpai'

    return `${shanten}-shanten`
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
                ukeire: ukeireFn(hand, shanten),
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

    const isComplete = results.shanten < 0

    return (
        <div className="flex-center flex-col gap-4 size-full overflow-hidden">
            <h3 className={concat("grow flex text-center font-bold", isComplete ? 'items-center' : 'items-end')}>
                {named(results.shanten)}
            </h3>
            {!isComplete && (
                <>
                    <div className="grid justify-center items-center overflow-hidden">
                        <div className="size-full overflow-auto touch-pan-xy">
                            <DiscardTiles results={results} />
                        </div>
                    </div>
                    <div className="grow" />
                </>
            )}
        </div>
    )
}
