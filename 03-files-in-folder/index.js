const fs = require('node:fs');
const path = require('node:path');

const output = async () => {
  const dirPath = path.join(__dirname, 'secret-folder');
  try {
    const stack = await fs.promises.readdir(dirPath);
    for (let file of stack){
      let extName = path.extname(file);
      let fileName = path.basename(file, extName);
      fs.stat(path.join(__dirname, 'secret-folder', path.basename(file)), (error, stats)=>{
        if (error) {
          throw error;
        }
        if (stats.isFile()){
          console.log(`${fileName}-${extName.slice(1)}-${stats.size / 1000}kb`);
        }
      });
    }
  } catch (error){
    console.error(error);
  }
};
output();
