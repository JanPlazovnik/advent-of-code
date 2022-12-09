export default class Elf {
    constructor(public calories: number[]) {}

    public getCalories(): number[] {
        return this.calories;
    }

    public getCaloriesSum(): number {
        return this.calories.reduce((a, b) => a + b, 0);
    }
}
