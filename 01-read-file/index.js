const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(file, {encoding: 'utf-8'});

stream.on('readable', () => {
  let data = stream.read();
  if (data) console.log(data);
});

stream.on('error', (error) => {
  if (error.code === 'ENOENT') {
    console.log('File not found');
  } else {
    console.error('File read error');
  }
});