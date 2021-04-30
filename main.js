const exoExtrac = require('./lib/EsoExtractData');
const log = require('./lib/log/log');

const basegameFolder = 'F:\\games\\TESO\\The Elder Scrolls Online';

let extract = false;


if (extract) {
    log.log("Atualizando arquvios base");

    exoExtrac(basegameFolder);
}


