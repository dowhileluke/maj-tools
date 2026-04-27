import { generateArray } from "@dowhileluke/fns"
import { shanten } from "./functions/shanten"

const emptyHand = generateArray(38).fill(0)

export function runTest() {
    console.log(shanten(addTiles(emptyHand, [1, 4, 7, 12, 15, 18, 23, 26, 29, 31, 32, 33, 34, 35])))
    console.log(shanten(addTiles(emptyHand, [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5])))

    // let temp = generateArray(38).fill(0)

    // temp[1] = 3
    // temp[2] = 3
    // temp[3] = 3

    // temp[11] = 2
    // temp[21] = 2

    // console.log(shanten(temp))
}

function addTiles(hand: number[], indexes: number[]) {
    const result = [...hand]

    for (const i of indexes) {
        result[i] += 1
    }

    return result
}
