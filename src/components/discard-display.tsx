import { generateArray, split } from '@dowhileluke/fns'
import { useAppState } from '../hooks/use-app-state'
import { Tile } from './tile'
import { useMemo } from 'react'
import { DualPanel } from './dual-panel'

function sort(hand: number[]) {
    return [...hand].sort((a, b) => a - b)
}

export function DiscardDisplay() {
    const [state, actions] = useAppState()

    const tileList = useMemo(() => {
        const sorted = sort(state.tiles)

        return generateArray(14, i => {
            const n = sorted[i]

            if (!n) return [0, 0, 0] as const

            const rank = n % 10
            const suit = Math.floor(n / 10)

            return [n, rank, suit] as const
        })
    }, [state.tiles])

    return (
        <DualPanel expand='below'>
            <div className='flex-center flex-col gap-1'>
                {[tileList].map(list => (
                    <div className='flex-center gap-1'>
                        {list.map(([n, r, s]) => (
                            <Tile
                                size='sm'
                                rank={r}
                                suit={s}
                                onClick={() => actions.removeTile(n)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div>results</div>
        </DualPanel>
    )
}
