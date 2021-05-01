const exoExtrac = require('./lib/EsoExtractData');
const log = require('./lib/log/log');
const mongo = require('./lib/db/mongo');
const utils = require('./lib/utils/utils');

async function start() {

    const basegameFolder = 'F:\\games\\TESO\\The Elder Scrolls Online';

    let extract = false;

    if (extract) {
        log.log("Atualizando arquvios base");

        exoExtrac(basegameFolder);
    }

    log.log("Verificando atualizacoes");

    // verifica se tem novas traducoes
    utils.getNotTranslate();

    // verificar ja traduzidas
    // e traduzilas talvez usando o rabbit
    // gerar arquvios .lua para o addon    
    
    
    // TODO
    // criar arquivo do docker para traducao solo
}

start();
// log.log("Verificando atualizacoes");


