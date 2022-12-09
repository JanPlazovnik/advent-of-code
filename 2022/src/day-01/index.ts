import * as fs from 'fs';
import * as path from 'path';
import Elf from './Elf';

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/calories.txt'), 'utf8');

// Parse the input file
const lines = input.split('\r\n\r\n').map((line) => line.split('\r\n'));
const numbers = lines.map((line) => line.map((number) => parseInt(number, 10)));

// Create the elves
const elves = numbers.map((calories) => new Elf(calories));

// Find the elf with the most calories
const maxCalories = elves.reduce((max, elf) => Math.max(max, elf.getCaloriesSum()), 0);
console.log(`The elf with the most calories has ${maxCalories} calories.`);

// Find the sum of the top 3 elves with the most calories
const top3Calories = elves
    .sort((a, b) => b.getCaloriesSum() - a.getCaloriesSum())
    .slice(0, 3)
    .reduce((sum, elf) => sum + elf.getCaloriesSum(), 0);

console.log(`The sum of the top 3 elves with the most calories is ${top3Calories} calories.`);
