import { generateArray } from '@dowhileluke/fns'
import { useAppState } from '../hooks/use-app-state'
import { Tile } from './tile'
import { useMemo } from 'react'
import { putTiles } from '../functions/put'

const FOUR = generateArray(3, 0)
const NINE = generateArray(1, 9)
const HAND = generateArray(38).fill(0)

export function DiscardControls() {
    const [state, actions] = useAppState()

    const hand = useMemo(() => putTiles(HAND, state.tiles), [state.tiles])

    return (
        <div className='flex-center flex-col gap-1'>
            {FOUR.map(s => (
                <div className='flex-center gap-1'>
                    {NINE.map(r => {
                        const n = 10 * s + r

                        if (n > 37) return null

                        return (
                            <Tile
                                rank={r}
                                suit={s}
                                disabled={hand[n] > 3 || state.tiles.length > 13}
                                onClick={() => actions.addTile(n)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
