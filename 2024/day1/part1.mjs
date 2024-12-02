import { left, right } from './input.mjs'

const distances = [];

for (let i = 0; i < left.length; i++) {
    distances.push(Math.abs(left[i] - right[i]))
}

console.log(distances.reduce((a, b) => a + b, 0));