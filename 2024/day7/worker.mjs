import { workerData, parentPort } from 'worker_threads';

const operators = ["+", "*"];
const randomOperator = () => operators[Math.floor(Math.random() * operators.length)];

function pairUp(expression) {
    const parts = expression.split(/([+\-*/])/);
    while (parts.length > 3) {
        const grouped = `(${parts[0]}${parts[1]}${parts[2]})`;
        parts.splice(0, 3, grouped);
    }
    return parts.join('');
}

const chunk = workerData;
const found = [];

for (const [total, parts] of chunk) {
    let result;
    let count = 0;
    do {
        const expression = pairUp(parts.split(" ").map((e) => e + randomOperator()).join("").slice(0, -1));
        result = eval(expression);

        if (result == total) {
            found.push(total);
            break;
        }

        if (++count > 100_000) {
            break;
        }
    } while (result != total);
}

parentPort.postMessage(found);
