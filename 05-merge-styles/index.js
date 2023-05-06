const fs = require('node:fs');
const path = require('node:path');
const source = path.join(__dirname, 'styles');
const destination = path.join(__dirname, 'project-dist');

const mergeFiles = async (source, destination) => {
  try {
    const writeableStream = fs.createWriteStream(path.join(destination, 'bundle.css'));
    const files = await fs.promises.readdir(source);

    for (let file of files){
      fs.stat(path.join(source, path.basename(file)), (error, stats) => {
        if (error) {
          throw error;
        }
        if (stats.isFile() && path.extname(file) === '.css'){
          let readableStream = fs.createReadStream(path.join(source, path.basename(file)), 'utf8');
          readableStream.pipe(writeableStream);
        }
      });
    }
  } catch (error){
    console.erroror(error);
  }
};

mergeFiles(source, destination);
