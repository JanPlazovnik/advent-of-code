import { solve } from './solve.mjs';

const needles = [
    [["M", "#", "M"], ["#", "A", "#"], ["S", "#", "S"]],
    [["S", "#", "S"], ["#", "A", "#"], ["M", "#", "M"]],
    [["M", "#", "S"], ["#", "A", "#"], ["M", "#", "S"]],
    [["S", "#", "M"], ["#", "A", "#"], ["S", "#", "M"]],
]

console.log(solve(needles));