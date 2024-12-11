import { numbers, hash } from "./input.mjs";

const blink = (stone) => {
    const str = stone.toString()
    const mid = str.length / 2;

    if (stone === 0) {
        return [1]
    }

    if (str.length % 2 === 0) {
        return [
            +str.slice(0, mid),
            +str.slice(-mid)
        ]
    }

    return [stone * 2024]
}

const blinkRecursively = (stone, blinks, cache = new Map()) => {
    if (blinks <= 0) {
        return 1
    }

    const key = hash(stone, blinks);
    if (cache.has(key)) {
        return cache.get(key)
    }

    const result = blink(stone)
        .map(s => blinkRecursively(s, blinks - 1, cache))
        .reduce((a, b) => a + b, 0)

    cache.set(key, result)

    return result
}

const part1 = numbers.map(stone => blinkRecursively(stone, 25)).reduce((a, b) => a + b, 0)
const part2 = numbers.map(stone => blinkRecursively(stone, 75)).reduce((a, b) => a + b, 0)

console.log(part1, part2)
