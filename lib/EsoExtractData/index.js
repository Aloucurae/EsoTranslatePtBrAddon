const path = require('path');
const glob = require('glob');
const execSync = require('child_process').execSync;
const log = require('../log/log');
// const basegameFolder = 'F:\\games\\TESO\\The Elder Scrolls Online';

const verify = (str) => {

    const Reset = "\x1b[0m";

    const FgRed = "\x1b[31m";
    const FgGreen = "\x1b[32m";
    const FgYellow = "\x1b[33m";
    const FgWhite = "\x1b[37m";

    const BgRed = "\x1b[41m";
    const BgGreen = "\x1b[42m";
    const BgYellow = "\x1b[43m";
    const BgWhite = "\x1b[47m";

    let res = '';

    if (str.search('Successfully') > 1) {
        res = FgGreen;
    }

    if (str.search('Warning:') > 1) {
        res = FgYellow;
    }

    if (str.search('Error:') > 1) {
        res = FgRed;
    }

    return res + '%s' + Reset;
}

module.exports = function (basegameFolder) {

    const buildPath = path.resolve(__dirname, '../extract/');
    const gameFolder = path.resolve(basegameFolder + '\\depot\\eso.mnf');

    const args = ` "${gameFolder}" ${buildPath}\\`;

    const filesToExtract = [
        'en.lang',
        'en_client.lua',
        'en_pregame.lua'
    ];

    const src = path.resolve(__dirname, './EsoExtractData.exe');

    filesToExtract.forEach(file => {

        console.log("\n");
        log.title(`Extraindo arquivo ${file}`);

        var code = execSync(`${src} ${args}  -n ${file}`).toString();
        log.body(code, verify(code));
        log.botton(`${file}`);

    });

}
