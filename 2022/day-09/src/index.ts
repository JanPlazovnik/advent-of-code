import * as fs from "fs";
import * as path from "path";
import Point from "./Point";

// P1: 6284

// Read the input file
const input = fs.readFileSync(path.join(__dirname, "/input/input.txt"), "utf8");

// Parse it into {dir: string, num: number}[]
const lines = input.split("\n").map((line) => {
    const [dir, num] = line.split(" ");
    return { dir, num: parseInt(num) };
});

function getTailVisits(length: number) {
    // All knots on the rope start at (0, 0)
    const rope: Point[] = new Array(length);
    const visited: Point[] = [new Point(0, 0)];

    // Fill the rope with Point objects
    for (let i = 0; i < rope.length; i++) {
        rope[i] = new Point(0, 0);
    }

    // For each directional input, move the head and the tails
    for (const { dir, num } of lines) {
        // Move the head and the tails in the given direction by 1 until we reach the given number
        for (let i = 0; i < num; i++) {
            // Move the head
            rope[rope.length - 1].move(dir, 1);

            // Move each tail except the last one towards the next tail
            for (let j = rope.length - 2; j >= 0; j--) {
                if (!rope[j].isAdjacentOrOverlapping(rope[j + 1])) {
                    rope[j].moveTowards(rope[j + 1]);

                    // Only track the positions the first tail visits
                    if (j !== 0) {
                        continue;
                    }

                    // Add the position to the list of visited positions, if it hasn't been visited yet
                    if (visited.every((p) => !p.equals(rope[j]))) {
                        visited.push(new Point(rope[j].x, rope[j].y));
                    }
                }
            }
        }
    }

    return visited.length;
}

console.log(getTailVisits(2));
console.log(getTailVisits(10));
