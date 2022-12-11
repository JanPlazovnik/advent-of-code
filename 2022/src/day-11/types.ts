export interface Monkey {
    id: number;
    items: number[];
    operation: MonkeyOperation;
    test: MonkeyTest;
    inspections: number;
}

export interface MonkeyOperation {
    type: string;
    value: string;
}

export interface MonkeyTest {
    divisibleBy: number;
    true: number;
    false: number;
}

export enum WorryManageMode {
    DIVIDE = 'DIVIDE',
    MOD = 'MOD',
}
