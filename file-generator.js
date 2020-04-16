const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const init = async () => {
    try {
        let answer = await askQuestion();
        if (!answer) { console.log('Please give atleast your choice, try re-run'); return process.exit(); }
        let file = await generateFile(answer);
        if (file) return console.log(`File Created! ${file}`);
    } catch (error) {
        console.log(error.message);
    }
}

const generateFile = (answer) => {
    return new Promise((resolve, reject) => {
        !fs.existsSync(__dirname + '/custom-files') && fs.mkdirSync(__dirname + '/custom-files');
        const file = __dirname + `/custom-files/${getCurrentUnixTimestamp()}_custom_file_sized_${answer}_mb.txt`;

        fs.appendFile(file, '', async (err) => {
            if (err) throw err;
            for (let filesize = 0; filesize <= answer; ++filesize) {
                await fillFile(file);
                filesize = await getFileSize(file);
            }
            resolve(file);
        });
    });
}

const fillFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.open(file, 'a', (err, fd) => {
            if (err) throw err;
            fs.appendFile(fd, randomCharacters(1000000), 'utf8', (err) => {
                fs.close(fd, (err) => {
                    if (err) throw err;
                    resolve(true);
                });
                if (err) throw err;
            });
        });
    });
}

const askQuestion = () => {
    return new Promise((resolve, reject) => {
        rl.question('What size of file you need? For example: 1 = 1 mb \n', async (answer) => {
            if (!answer) resolve(false);
            else resolve(answer);
            rl.close();
        });
    });
}

function getFileSize(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) return reject(err);
            resolve(stats.size / 1000000.0); //1024000 //= 1MB
        })
    });
}

const randomCharacters = (length = 20, wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$") => Array(length).fill('').map(() => wishlist[Math.floor(Math.random() * wishlist.length)]).join('');

const getCurrentUnixTimestamp = () => (new Date().getTime() / 1000).toString().split('.')[0];

init();