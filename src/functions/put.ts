export function putTiles(hand: number[], indexes: number[]) {
    const result = [...hand]

    for (const i of indexes) {
        result[i] += 1
    }

    return result
}
