import * as fs from 'fs';
import * as path from 'path';
import Point from './Point';

const lines = fs
    .readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8')
    .split('\n')
    .map((line) => {
        const [dir, num] = line.split(' ');
        return { dir, num: parseInt(num) };
    });

function getTailVisits(length: number) {
    const rope: Point[] = new Array(length).fill(0).map(() => new Point(0, 0));
    const visited: Point[] = [new Point(0, 0)];

    for (const { dir, num } of lines) {
        for (let i = 0; i < num; i++) {
            rope[rope.length - 1].move(dir, 1);

            for (let j = rope.length - 2; j >= 0; j--) {
                if (rope[j].isAdjacentOrOverlapping(rope[j + 1])) {
                    continue;
                }

                rope[j].moveTowards(rope[j + 1]);

                if (j === 0 && visited.every((p) => !p.equals(rope[j]))) {
                    visited.push(new Point(rope[j].x, rope[j].y));
                }
            }
        }
    }

    return visited.length;
}

console.log(getTailVisits(2)); // 6284
console.log(getTailVisits(10)); // 2661
