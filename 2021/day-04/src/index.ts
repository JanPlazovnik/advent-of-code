import * as fs from 'fs';
import * as path from 'path';

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8').trim();

interface BingoField {
    num: number;
    found: boolean;
}

function parseInput(input: string): [number[], BingoField[][][]] {
    const lines = input.split('\n');
    const numbers = lines.shift()?.split(',').map(Number) || [];
    lines.shift();

    const boards: BingoField[][][] = [];
    while (lines.length) {
        const board: BingoField[][] = [];
        while (lines.length && lines[0] !== '') {
            const line = lines.shift()?.split(' ') || [];
            const filtered = line.filter((it) => it !== '');
            board.push(filtered.map((it) => ({ num: Number(it), found: false })));
        }
        boards.push(board);
        lines.shift();
    }

    return [numbers, boards];
}

function checkBoard(board: BingoField[][], selected: number): boolean {
    for (const row of board) {
        const numberInRow = row.find((field) => field.num === selected);
        if (numberInRow) {
            numberInRow.found = true;
        }
    }

    for (const row of board) {
        if (row.every((field) => field.found)) {
            return true;
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (board.every((row) => row[i].found)) {
            return true;
        }
    }

    return false;
}

function part1(): void {
    const [numbers, boards] = parseInput(input);
    for (const selected of numbers) {
        for (let i = 0; i < boards.length; i++) {
            if (checkBoard(boards[i], selected)) {
                const unmarked = boards[i].flat().filter((field) => !field.found);
                const score = unmarked.reduce((acc, field) => acc + field.num, 0) * selected;
                console.log(`Board ${i + 1} wins with score ${score}!`);
                return;
            }
        }
    }
}

part1();
