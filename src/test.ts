import { generateArray } from "@dowhileluke/fns"
import { shanten } from "./functions/shanten"
import { advancedUke, groupedUke, multiUkeire, ukeire } from "./functions/ukeire"
import { putTiles } from "./functions/put"
import { pluckTiles } from "./functions/pluck"

const emptyHand = generateArray(38).fill(0)

export function runTest() {
    // console.log(shanten(addTiles(emptyHand, [1, 4, 7, 12, 15, 18, 23, 26, 29, 31, 32, 33, 34, 35])))
    // console.log(shanten(addTiles(emptyHand, [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5])))

    // let temp = generateArray(38).fill(0)

    // temp[1] = 3
    // temp[2] = 3
    // temp[3] = 3

    // temp[11] = 2
    // temp[21] = 2

    // console.log(shanten(temp))

    // full hand...33m223677888p456s
    // try without 2p
    // console.log(ukeire(addTiles(emptyHand, [3, 3, 12, 13, 16, 17, 17, 18, 18, 18, 24, 25, 26])))
    // try multi with 2p
    // console.log(multiUkeire(addTiles(emptyHand, [3, 3, 12, 12, 13, 16, 17, 17, 18, 18, 18, 24, 25, 26])))
    // console.log(groupedUke())

    const testHand = putTiles(emptyHand, [3, 3, 12, 12, 13, 16, 17, 17, 18, 18, 18, 24, 25, 26])

    // const [, uke1] = multiUkeire(testHand)

    // console.log('uke1', uke1)

    // const discard = pluckTiles(testHand, [uke1.t])
    // const improved = putTiles(discard, [uke1.tiles[0]])

    // console.log('improved', improved)

    // console.log(multiUkeire(improved, undefined, undefined, uke1.tiles))


    // const asdf = uke1.tiles.map(t => {
    //     const improved = putTiles(discard, [t])

    //     const waits = multiUkeire(improved, undefined, 0, uke1.tiles)

    //     return [t, waits]
    // })

    // console.log(uke1)
    // console.log(asdf)

    console.log(groupedUke(testHand))

    // console.info('skipping tests')
}
