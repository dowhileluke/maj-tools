import { generateArray } from '@dowhileluke/fns'
import { useAppState } from '../hooks/use-app-state';
import { TileList } from './tile-list';
import { Tile } from './tile';
import { Backspace } from '@phosphor-icons/react';
import { useMemo } from 'react';

type DiscardInputProps = {
    hand: number[];
}

const manzu = generateArray(1, 9)
const pinzu = generateArray(11, 19)
const souzu = generateArray(21, 29)
const jihai = generateArray(31, 37)
const groups = [souzu, pinzu, manzu]

const emptySelection = generateArray(14).fill(0)

function sort(tiles: number[]) {
    return [...tiles].sort((a, b) => a - b)
}

export function DiscardInput({ hand }: DiscardInputProps) {
    const [state, actions] = useAppState()
    const selection = useMemo(() => sort(state.tiles).concat(emptySelection).slice(0, 14), [state.tiles])

    function toList(g: number[]) {
        return (
            <TileList
                tiles={g}
                onClick={n => actions.addTile(n)}
                isDisabled={n => hand[n] > 3 || state.tiles.length > 13}
            />
        )
    }

    return (
        <div className="flex-center flex-col gap-4">
            <TileList tiles={selection} size="sm" onClick={n => actions.removeTile(n)} />
            <div className="flex-center flex-col gap-1">
                <div className="flex-center gap-1">
                    {toList(jihai)}
                    <Tile n={0} />
                    <Tile n={39} onClick={() => actions.removeTile(-1)}>
                        <Backspace size="1em" />
                    </Tile>
                </div>
                {groups.map(toList)}
            </div>
        </div>
    )
}
