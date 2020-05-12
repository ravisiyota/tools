const fs = require('fs');
const util = require('util');

const rename = util.promisify(fs.rename);
const readDir = util.promisify(fs.readdir);

const renameFile = async (newFile, oldFile) => {
    await rename(newFile, oldFile);
    console.log(`File Renamed from ${oldFile} =====> ${newFile}`)
    return true;
}

const init = async () => {
    const oldLocation = process.argv[2];
    const newLocation = process.argv[3];

    const oldFiles = await readDir(oldLocation);
    oldFiles.forEach(async (file) => {
        // Do whatever you want to do with the file
        console.log(file);
        await renameFile(oldLocation + file, `${newLocation}/${Date.now()}_${file}`);
    });
}

init();