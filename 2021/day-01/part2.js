const input = require("fs").readFileSync(__dirname + "/input/input.txt", "utf-8").split("\n").map(it => parseInt(it));

let count = 0;
for (let i = 0; i < input.length - 3; i++) {
    const firstWindow = input[i] + input[i+1] + input[i+2];
    const secondWindow = input[i+1] + input[i+2] + input[i+3];

    if (secondWindow > firstWindow) {
        count++;
    }
}
console.log(count);
