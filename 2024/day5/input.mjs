import fs from 'fs';

const args = process.argv;

const file = (args[2] == "demo" ? "demo" : "input") + ".txt";
const [top, bottom] = fs.readFileSync(file, 'utf-8').trim().split("\n\n").map((e) => e.split("\n"));
const rules = top.map((e) => e.split("|").map(Number));
const updates = bottom.map((e) => e.split(",").map(Number));

export { rules, updates }