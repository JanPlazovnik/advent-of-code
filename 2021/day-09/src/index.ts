import * as fs from 'fs';
import * as path from 'path';

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8');
const numbers = input.split('\r\n').map((it) => it.split('').map((it) => parseInt(it)));

interface BasinMember {
    value: number;
    row: number;
    col: number;
}

function getBasinMember(row: number, col: number): BasinMember {
    return {
        row,
        col,
        value: numbers[row]?.[col] ?? 9,
    };
}

function getBasin(
    row: number,
    col: number,
    contents: Set<BasinMember> = new Set()
): Set<BasinMember> {
    const adjacent = [
        getBasinMember(row - 1, col),
        getBasinMember(row + 1, col),
        getBasinMember(row, col - 1),
        getBasinMember(row, col + 1),
    ].filter((it) => it.value !== 9);

    // Get all the new members, that are not yet in the contents set
    // prettier-ignore
    const newMembers = adjacent.filter(
        (adj) => Array.from(contents).findIndex((it) => JSON.stringify(it) === JSON.stringify(adj)) === -1
    );

    // Add all the found adjacent members to contents set
    newMembers.forEach((adj) => contents.add(adj));

    // For each of the found members, find their adjacent members
    for (const member of newMembers) {
        contents = getBasin(member.row, member.col, contents);
    }

    return contents;
}

const lowPoints: number[] = [];
const basins: Set<BasinMember>[] = [];
for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers[i].length; j++) {
        const adjacent = [
            numbers[i - 1]?.[j],
            numbers[i + 1]?.[j],
            numbers[i][j - 1],
            numbers[i][j + 1],
        ].filter((it) => it >= 0);

        // If all the adjacent ones are higher than current point, then this is a low point
        if (adjacent.every((it) => it > numbers[i][j])) {
            lowPoints.push(numbers[i][j]);
            basins.push(getBasin(i, j, new Set([getBasinMember(i, j)])));
        }
    }
}
const riskLevel = lowPoints.reduce((sum, value) => sum + value + 1) + 1;
console.log(riskLevel);

const top3 = basins.sort((a, b) => b.size - a.size).slice(0, 3);
console.log(top3[0].size * top3[1].size * top3[2].size);
