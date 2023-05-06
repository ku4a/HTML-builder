const fs = require('node:fs');
const path = require('node:path');
const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

let copyStyles = async (source, destination) => {
  try{
    await fs.promises.rm(destination, { recursive: true, force: true });
    await fs.promises.mkdir(destination, { recursive: true });
    
    fs.promises.readdir(source)
      .then(filenames => {
        for (let filename of filenames) {
          let sourcePath = path.join(source, filename);
          let destPath = path.join(destination, filename);
          fs.copyFile(sourcePath, destPath, (error) => {
            if (error) throw error;
          });
        }
      })
      .catch(error => {
        throw error;
      });
  } catch (error){
    console.erroror(error);
  }
};

copyStyles (source, destination);
