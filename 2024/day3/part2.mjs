import { matches2 as matches } from './input.mjs';

let enabled = true;
console.log(matches.reduce((acc, [match, a, b]) => match.startsWith("mul") && enabled ? acc + a * b : match == "don't()" ? (enabled = false, acc) : match == "do()" ? (enabled = true, acc) : acc, 0));