import * as fs from 'fs';
import * as path from 'path';

const options: { [key: string]: GameOption } = {
    X: {
        name: 'Rock',
        value: 1,
        beats: 'Z',
    },
    Y: {
        name: 'Paper',
        value: 2,
        beats: 'X',
    },
    Z: {
        name: 'Scissors',
        value: 3,
        beats: 'Y',
    },
};

const opponentOptionMap: { [key: string]: string } = {
    A: 'X',
    B: 'Y',
    C: 'Z',
};

interface GameOption {
    name: string;
    value: number;
    beats: string;
}

enum ResultScore {
    Win = 6,
    Lose = 0,
    Draw = 3,
}

// Get the round score based on the result
function getRoundScore(playerOption: GameOption, opponentOption: GameOption): number {
    const opponentKey = Object.keys(options).find(
        (key) => options[key].name === opponentOption.name
    ) as string;
    let resultBonus = 0;

    if (playerOption.name === opponentOption.name) {
        resultBonus = ResultScore.Draw;
    } else if (playerOption.beats === opponentKey) {
        resultBonus = ResultScore.Win;
    } else {
        resultBonus = ResultScore.Lose;
    }

    return playerOption.value + resultBonus;
}

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8');

// Parse the input file
const lines = input.split('\r\n');

// Set the initial score
let points = 0;

// Calculate the points
for (const line of lines) {
    const [opponent, me] = line.split(' ');
    const opponentOption = options[opponentOptionMap[opponent]];
    const myOption = options[me];

    points += getRoundScore(myOption, opponentOption);
}
console.log('Points: ', points);

// Reset the score
points = 0;

// Re-calculate the points based on how the round needs to be played
for (const line of lines) {
    const [opponent, result] = line.split(' ');
    const opponentOption = options[opponentOptionMap[opponent]];

    switch (result) {
        case 'X': {
            // This is a loss so our option is the one that is beaten by whatever the opponent played
            const myOption = options[opponentOption.beats];
            points += getRoundScore(myOption, opponentOption);
            break;
        }
        case 'Y':
            // This is a draw so just play the same option as the opponent
            points += getRoundScore(opponentOption, opponentOption);
            break;
        case 'Z': {
            // This is a win so we need to play whatever beats the opponent
            const myOption = Object.values(options).find(
                (option) => option.beats === opponentOptionMap[opponent]
            );
            if (!myOption) throw new Error('え? Invalid option');

            points += getRoundScore(myOption, opponentOption);
            break;
        }
    }
}

console.log('Points: ', points);
