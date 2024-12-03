import { matches1 as matches } from './input.mjs';

console.log(matches.reduce((acc, [_, a, b]) => acc + a * b, 0))