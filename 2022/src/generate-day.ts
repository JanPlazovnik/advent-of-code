import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as open from 'open';
import { lpad } from './common/utils';

(async () => {
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const dir = `day-${day}/input`;
    const url = `https://adventofcode.com/${year}/day/${day}`;

    // Check if the day's directory already exists
    if (fs.existsSync(path.join(__dirname, `day-${lpad(day)}`))) {
        console.log(`Day ${day} directory already exists. Aborting...`);
        return;
    }

    // Create the day's directory
    console.log(`Creating ${dir}...`);
    fs.mkdirSync(path.join(__dirname, `day-${lpad(day)}/input`), {
        recursive: true,
    });

    // Fetch input data
    console.log(`Fetching input for day ${day}...`);
    const input = await axios.get(`${url}/input`, {
        headers: {
            Cookie: `session=${process.env.AOC_SESSION}`,
        },
    });

    // Write input to file
    console.log(`Writing input to ${dir}/input.txt...`);
    fs.writeFileSync(
        path.join(__dirname, `day-${lpad(day)}/input/input.txt`),
        input.data.trim()
    );

    // Create empty demo input
    console.log(`Creating empty demo input in ${dir}/input/demo.txt...`);
    fs.writeFileSync(
        path.join(__dirname, `day-${lpad(day)}/input/demo.txt`),
        ''
    );

    // Create index.ts
    console.log(`Writing index.ts to ${dir}/index.ts...`);
    fs.writeFileSync(
        path.join(__dirname, `day-${lpad(day)}/index.ts`),
        // prettier-ignore
        [
            `import * as fs from 'fs';`,
            `import * as path from 'path';`,
        ].join('\n')
    );

    // Add run script to package.json
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
    );
    packageJson.scripts[`${day}`] = `ts-node src/day-${lpad(day)}/index`;
    fs.writeFileSync(
        path.join(__dirname, '../package.json'),
        JSON.stringify(packageJson, null, 4)
    );

    // Open the day's page in browser
    console.log(`Opening ${url}...`);
    await open(url);

    console.log('Done!');
    console.log(`Run 'npm run ${day}' to run the script.`);
})();
