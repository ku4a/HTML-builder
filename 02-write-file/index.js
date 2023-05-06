const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const os = require('os');
const readline = require('readline');
const file = path.join(__dirname, 'test.txt');
const writeableStream = fs.createWriteStream(file);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdout.write(`Hello, user! Type some text: ${os.EOL}`);

rl.on('line', line => {
  if (line.trim() === 'exit') {
    rl.close();
  } else {
    writeableStream.write(line + '\n');
  }
});

rl.on('close', () => {
  process.stdout.write('See you later!');
  writeableStream.end();
});

rl.on('SIGINT', () => {
  rl.close();
  writeableStream.end();
});