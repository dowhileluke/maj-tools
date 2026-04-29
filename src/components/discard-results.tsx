import { generateArray, split } from '@dowhileluke/fns'
import { useAppState } from '../hooks/use-app-state'
import { useMemo } from 'react'
import { putTiles } from '../functions/put'

function sort(hand: number[]) {
    return [...hand].sort((a, b) => a - b)
}
const HAND = generateArray(38).fill(0)

/////// work in progress ////////
export function DiscardResults() {
    const [state, actions] = useAppState()

    const results = useMemo(() => {
        const hand = putTiles(HAND, state.tiles)


    }, [state.tiles])

    return (
        <div className=''>

        </div>
    )
}
