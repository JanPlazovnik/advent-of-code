import fs from 'fs';

const args = process.argv;

const file = (args[2] == "demo" ? "demo" : "input") + ".txt";
const data = fs.readFileSync(file, 'utf-8').trim();
const numbers = data.split(" ").map(Number);

const hash = (a, b) => a * 10000 + b;

export { numbers, hash };