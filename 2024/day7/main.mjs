import { Worker } from 'worker_threads';
import { numbers } from './input.mjs';

const workersCount = 12;
const chunkSize = Math.ceil(numbers.length / workersCount);
const chunks = Array.from({ length: workersCount }, (_, i) =>
    numbers.slice(i * chunkSize, (i + 1) * chunkSize)
);

let found = [];
let completedWorkers = 0;

chunks.forEach((chunk, index) => {
    const worker = new Worker('./worker.mjs', { workerData: chunk });
    worker.on('message', (result) => {
        found = found.concat(result);
        completedWorkers++;
        if (completedWorkers === workersCount) {
            console.log(found.reduce((a, b) => a + b, 0));
        }
    });
    worker.on('error', (err) => console.error(`Worker ${index} error:`, err));
    worker.on('exit', (code) => {
        if (code !== 0) console.error(`Worker ${index} stopped with exit code ${code}`);
    });
});
