import { generateArray } from '@dowhileluke/fns'
import { useAppState } from '../hooks/use-app-state';
import { TileList } from './tile-list';
import { Tile } from './tile';
import { Backspace, ClipboardText, Keyboard } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { encodeTiles } from '../functions/tile-encoding';

type DiscardInputProps = {
    hand: number[];
}

const inputStyle = 'border rounded-sm px-1 w-48'
const buttonStyle = 'rounded-lg px-2 py-1 gap-1'

const manzu = generateArray(1, 9)
const pinzu = generateArray(11, 19)
const souzu = generateArray(21, 29)
const jihai = generateArray(31, 37)
const groups = [souzu, pinzu, manzu]

const emptySelection = generateArray(14).fill(0)

function sort(tiles: number[]) {
    return [...tiles].sort((a, b) => a - b)
}

function copyText(text: string) {
    if (navigator.clipboard.write) {
        navigator.clipboard.write([
            new ClipboardItem({
                'text/plain': text,
            })
        ])
    } else {
        navigator.clipboard.writeText(text)
    }
}

export function DiscardInput({ hand }: DiscardInputProps) {
    const [state, actions] = useAppState()
    const [encoded, setEncoded] = useState('')
    const [input, setInput] = useState('')
    const selection = useMemo(() => sort(state.tiles).concat(emptySelection).slice(0, 14), [state.tiles])

    function toList(g: number[], i?: number) {
        return (
            <TileList
                key={i}
                tiles={g}
                onClick={n => actions.addTile(n)}
                isDisabled={n => hand[n] > 3 || state.tiles.length > 13}
            />
        )
    }

    function openModal() {
        setInput('')
        setEncoded(encodeTiles(state.tiles))
        actions.setIsResetting(true)
    }

    return (
        <div className="flex-center flex-col gap-4">
            <TileList tiles={selection} size="sm" onClick={n => actions.removeTile(n)} />
            <div className="flex-center flex-col gap-1">
                <div className="flex-center gap-1">
                    {toList(jihai)}
                    <Tile t={39} onClick={openModal}>
                        <Keyboard size="1em" />
                    </Tile>
                    <Tile t={39} onClick={() => actions.removeTile(-1)}>
                        <Backspace size="1em" />
                    </Tile>
                </div>
                {groups.map(toList)}
            </div>
            <Modal
                open={state.isResetting}
                onClose={() => actions.setIsResetting(false)}
                autoFocus
            >
                <form
                    className="flex-center flex-col gap-8"
                    onSubmit={e => {
                        e.preventDefault()
                        actions.setTiles(input)
                    }}
                >
                    {/* <h3 className="text-xl font-bold">Edit all scores?</h3> */}
                    {encoded && (<div className="flex-center gap-1">
                        <code>{encoded}</code>
                        <Button className={buttonStyle} onClick={() => copyText(encoded)}>
                            <ClipboardText size="1em" />
                        </Button>
                    </div>)}
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className={inputStyle}
                        placeholder="Enter new hand"
                    />
                    <div className="flex gap-4">
                        <Button className={buttonStyle} onClick={() => actions.setIsResetting(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className={''}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
