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
