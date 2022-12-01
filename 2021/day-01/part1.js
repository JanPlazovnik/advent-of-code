const input = require("fs").readFileSync(__dirname + "/input/input.txt", "utf-8").split("\n").map(it => parseInt(it));

let count = 0;
let previousValue = null;

for (const value of input) {
    if (!previousValue) {
        previousValue = value;
    }
    
    if (value > previousValue) {
        count++;
    }
    
    previousValue = value;
}

console.log(count);