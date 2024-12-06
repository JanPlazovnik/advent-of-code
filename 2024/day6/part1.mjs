import { map, hash } from './input.mjs'

const DIRECTIONS = {
    UP: "^",
    DOWN: "v",
    LEFT: "<",
    RIGHT: ">"
}

const INSTRUCTIONS = {
    [DIRECTIONS.UP]: { next: { x: -1, y: 0 }, nextRotate: { x: 0, y: 1 }, nextDirection: DIRECTIONS.RIGHT },
    [DIRECTIONS.RIGHT]: { next: { x: 0, y: 1 }, nextRotate: { x: 1, y:  0 }, nextDirection: DIRECTIONS.DOWN },
    [DIRECTIONS.DOWN]: { next: { x: 1, y: 0 }, nextRotate: { x: 0, y: -1 }, nextDirection: DIRECTIONS.LEFT },
    [DIRECTIONS.LEFT]: { next: { x: 0, y: -1 }, nextRotate: { x: -1, y: 0 }, nextDirection: DIRECTIONS.UP },
}

const OBSTACLE = "#";
const PATH = ".";

const indexOf = (row, guard) => {
    const guardIndex = row.indexOf(guard);
    if (guardIndex === -1) return false;
    return { guardIndex, guard };
}

const outOfBounds = (x, y) => {
    if (x < 0 || x > map[0].length - 1) return true;
    else if (y < 0 || y > map.length - 1) return true;
    else return false;
}

const isPositionObstacle = (x, y) => {
    return map[x][y] === OBSTACLE; 
}

const uniquePositions = new Set();

let guardInArea = true;
do {
    for (let row = 0; row < map.length; row++) {
        const mRow = map[row];
        const { guardIndex, guard } = indexOf(mRow, DIRECTIONS.UP) ||  indexOf(mRow, DIRECTIONS.DOWN) ||  indexOf(mRow, DIRECTIONS.LEFT) ||  indexOf(mRow, DIRECTIONS.RIGHT);
        if (!guardIndex) continue;

        uniquePositions.add(hash(row, guardIndex));

        const instruction = INSTRUCTIONS[guard];
        
        if (outOfBounds(row + instruction.next.x, guardIndex + instruction.next.y)) {
            guardInArea = false;
            continue;
        }

        if (isPositionObstacle(row + instruction.next.x, guardIndex + instruction.next.y)) {
            if (outOfBounds(row + instruction.nextRotate.x, guardIndex + instruction.nextRotate.y)) {
                guardInArea = false;
                continue;
            }

            if (isPositionObstacle(row + instruction.nextRotate.x, guardIndex + instruction.nextRotate.y)) {
                map[row][guardIndex] = instruction.nextDirection;
                continue;
            }

            map[row + instruction.nextRotate.x][guardIndex + instruction.nextRotate.y] = instruction.nextDirection;
            map[row][guardIndex] = PATH;
            continue;
        }

        map[row + instruction.next.x][guardIndex + instruction.next.y] = guard;
        map[row][guardIndex] = PATH;
    }
} while (guardInArea);

console.log(uniquePositions.size)

