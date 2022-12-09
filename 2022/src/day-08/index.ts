import * as fs from 'fs';
import * as path from 'path';

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8');
const lines = input.split('\r\n').map((line) => line.split('').map((tree) => parseInt(tree)));

//! i don't want to talk about it

function part1(): void {
    // We already know the edges are visible, so do some ✨ math ✨
    let visibleTrees = 2 * lines.length + 2 * (lines.length - 2);

    // Loop through each inner row and column
    for (let i = 1; i < lines.length - 1; i++) {
        for (let j = 1; j < lines[0].length - 1; j++) {
            // Check if the tree is visible from all the trees above
            let sub = [];
            for (let k = 0; k < i; k++) {
                sub.push(lines[k][j]);
            }
            if (sub.every((val) => val < lines[i][j])) {
                visibleTrees++;
                continue;
            }

            // Check if the tree is visible from all the trees to the right
            sub = [];
            for (let k = j + 1; k < lines[i].length; k++) {
                sub.push(lines[i][k]);
            }
            if (sub.every((val) => val < lines[i][j])) {
                visibleTrees++;
                continue;
            }

            // Check if the tree is visible from all the trees below
            sub = [];
            for (let k = i + 1; k < lines.length; k++) {
                sub.push(lines[k][j]);
            }
            if (sub.every((val) => val < lines[i][j])) {
                visibleTrees++;
                continue;
            }

            // Check if the tree is visible from all the trees to the left
            sub = [];
            for (let k = 0; k < j; k++) {
                sub.push(lines[i][k]);
            }
            if (sub.every((val) => val < lines[i][j])) {
                visibleTrees++;
                continue;
            }
        }
    }
    console.log(visibleTrees);
}

function part2(): void {
    let scenic_score = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            let up = 0;
            for (let k = i - 1; k >= 0; k--) {
                up++;
                if (lines[k][j] >= lines[i][j]) {
                    break;
                }
            }

            let right = 0;
            for (let k = j + 1; k < lines[i].length; k++) {
                right++;
                if (lines[i][k] >= lines[i][j]) {
                    break;
                }
            }

            let down = 0;
            for (let k = i + 1; k < lines.length; k++) {
                down++;
                if (lines[k][j] >= lines[i][j]) {
                    break;
                }
            }

            let left = 0;
            for (let k = j - 1; k >= 0; k--) {
                left++;
                if (lines[i][k] >= lines[i][j]) {
                    break;
                }
            }

            const score = up * right * down * left;
            if (score > scenic_score) scenic_score = score;
        }
    }

    console.log(scenic_score);
}

part1();
part2();
