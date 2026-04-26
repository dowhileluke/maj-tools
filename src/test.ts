import { generateArray } from "@dowhileluke/fns"
import { shanten } from "./functions/shanten"

export function runTest() {
    let temp = generateArray(38).fill(0)

    temp[1] = 3
    temp[2] = 3
    temp[3] = 3

    temp[11] = 2
    temp[21] = 2

    console.log(shanten(temp))
}
