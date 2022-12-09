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
