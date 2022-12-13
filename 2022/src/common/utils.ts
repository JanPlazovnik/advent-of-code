export function chunkify<T>(input: T[], chunks: number): T[][] {
    return input.reduce((resultArray: T[][], item, index) => {
        const chunkIndex = Math.floor(index / chunks);
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
    }, []);
}

export function lpad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
}

export function random<T>(input: T[]): T {
    return input[Math.floor(Math.random() * input.length)];
}

export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

export class Timer {
    private readonly time: [number, number];

    constructor(message: string) {
        console.log(message);
        this.time = process.hrtime();
    }

    public end(): void {
        const duration = process.hrtime(this.time);
        const parsedDuration = (duration[0] + duration[1] / 1e9).toFixed(3);
        console.log(`Done. Took ${parsedDuration} seconds.`);
    }
}

export enum InputType {
    Part1,
    Part2,
}

export function deepEqual(x: any, y: any): boolean {
    return JSON.stringify(x) === JSON.stringify(y);
}
