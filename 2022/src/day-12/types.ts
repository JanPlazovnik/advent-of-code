export type CoordinatePair = [number, number];

export enum InputType {
    Part1,
    Part2,
}

export interface StartPoint {
    point: CoordinatePair;
    steps: number;
}
