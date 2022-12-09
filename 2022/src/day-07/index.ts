import * as fs from 'fs';
import * as path from 'path';
import { DirectoryMap, Directory } from './day7';

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8');
const commands = input.split('\r\n');

const root: Directory = { parent: '', size: 0, path: '/' };
let activeDir = root;
const dirMap: DirectoryMap = {
    '/': root,
};

// Loop through the commands
for (const command of commands) {
    const parts = command.split(' ');
    const isCommand = parts[0] === '$';
    const isFile = !isNaN(parseInt(parts[0]));
    const isDirectory = parts[0] === 'dir';

    if ((isCommand && parts[1] === 'ls') || isDirectory) {
        continue;
    }

    if (isCommand && parts[1] === 'cd') {
        if (parts[2] === '..') {
            activeDir = dirMap[activeDir.parent];
            continue;
        }

        let path = '';
        if (parts[2] === '/') {
            path = '/';
        } else if (activeDir.path === '/') {
            path = activeDir.path + parts[2];
        } else {
            path = activeDir.path + '/' + parts[2];
        }

        // If the directory already exists, set it as the active directory
        if (dirMap[path]) {
            activeDir = dirMap[path];
            continue;
        }

        // If the directory doesn't exist, create it and set it as the active directory
        const newDir: Directory = {
            parent: activeDir.path,
            size: 0,
            path,
        };

        dirMap[path] = newDir;
        activeDir = newDir;
    }

    if (isFile) {
        const size = parseInt(parts[0]);
        dirMap[activeDir.path].size += size;
        let parent = dirMap[activeDir.parent];
        while (parent) {
            parent.size += size;
            parent = dirMap[parent.parent];
        }
    }
}

const p1 = Object.values(dirMap)
    .filter((d) => d.size <= 100000)
    .reduce((acc, cur) => acc + cur.size, 0);

const TOTAL_AVAIABLE_SPACE = 70000000;
const MINIMUM_REQUIRED = 30000000;
const rootSize = dirMap[Object.keys(dirMap)[0]].size;

const p2 = Math.min(
    ...Object.values(dirMap)
        .filter((d) => TOTAL_AVAIABLE_SPACE - rootSize + d.size >= MINIMUM_REQUIRED)
        .map((d) => d.size)
);

console.log(p1);
console.log(p2);
