export default class Point {
    constructor(public x: number, public y: number) {}

    up(amount: number): void {
        this.y += amount;
    }

    down(amount: number): void {
        this.y -= amount;
    }

    right(amount: number): void {
        this.x += amount;
    }

    left(amount: number): void {
        this.x -= amount;
    }

    equals(other: Point): boolean {
        return this.x === other.x && this.y === other.y;
    }

    move(where: string, amount: number): void {
        if (where === "U") this.up(amount);
        else if (where === "D") this.down(amount);
        else if (where === "R") this.right(amount);
        else if (where === "L") this.left(amount);
        else throw new Error(`Unknown direction: ${where}`);
    }

    isAdjacentOrOverlapping(other: Point): boolean {
        return (
            (this.x === other.x && this.y === other.y) ||
            (this.x === other.x && Math.abs(this.y - other.y) === 1) ||
            (this.y === other.y && Math.abs(this.x - other.x) === 1) ||
            (Math.abs(this.x - other.x) === 1 &&
                Math.abs(this.y - other.y) === 1)
        );
    }

    moveTowards(other: Point): void {
        if (this.y === other.y) {
            if (this.x < other.x) {
                this.x++;
            } else if (this.x > other.x) {
                this.x--;
            }
        } else if (this.x === other.x) {
            if (this.y < other.y) {
                this.y++;
            } else if (this.y > other.y) {
                this.y--;
            }
        } else {
            if (this.x < other.x) {
                this.x++;
            } else if (this.x > other.x) {
                this.x--;
            }
            if (this.y < other.y) {
                this.y++;
            } else if (this.y > other.y) {
                this.y--;
            }
        }
    }

    toString(): string {
        return `(${this.x},${this.y})`;
    }
}
