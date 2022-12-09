import * as fs from "fs";
import * as path from "path";
import Point from "./Point";

// Read the input file
const lines = fs
    .readFileSync(path.join(__dirname, "/input/input.txt"), "utf8")
    .split("\n")
    .map((line) => {
        const [dir, num] = line.split(" ");
        return { dir, num: parseInt(num) };
    });

function getTailVisits(length: number) {
    // All knots on the rope start at (0, 0)
    const rope: Point[] = new Array(length).fill(0).map(() => new Point(0, 0));
    const visited: Point[] = [new Point(0, 0)];

    // For each directional input, move the head and the tails
    for (const { dir, num } of lines) {
        // Move the head and the tails in the given direction by 1 until we reach the given number
        for (let i = 0; i < num; i++) {
            // Move the head
            rope[rope.length - 1].move(dir, 1);

            // Move each tail except the last one towards the next tail
            for (let j = rope.length - 2; j >= 0; j--) {
                if (rope[j].isAdjacentOrOverlapping(rope[j + 1])) {
                    continue;
                }

                rope[j].moveTowards(rope[j + 1]);

                // Add the position to the list of visited positions, if it hasn't been visited yet
                if (j === 0 && visited.every((p) => !p.equals(rope[j]))) {
                    visited.push(new Point(rope[j].x, rope[j].y));
                }
            }
        }
    }

    return visited.length;
}

console.log(getTailVisits(2));
console.log(getTailVisits(10));
