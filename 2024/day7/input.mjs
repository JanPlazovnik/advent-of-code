import fs from 'fs';

const args = process.argv;

const file = (args[2] == "demo" ? "demo" : "input") + ".txt";
const data = fs.readFileSync(file, 'utf-8').trim();
const numbers = data
    .split("\n")
    .map((e) => {
        const [total, parts] = e.split(": ")
        const partsArray = parts.split(" ").map(Number)

        // return original string for now
        return [Number(total), parts]
    })

export { numbers }