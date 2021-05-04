"use strinct"
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const path = require('path');
const mongo = require('../db/mongo');
const log = require('../log/log');


class utils {

  getJsonFile() {

    const exportDir = path.resolve(__dirname, "../extract/gamedata/lang");
    const file = fs.readFileSync(exportDir + "/en.lang.csv");

    const array = parse(file, {
      columns: true,
      skip_empty_lines: true
    });

    return array;
  }

  getTranslatedJson() {

    try {
      const exportDir = path.resolve(__dirname, "../../assets");
      const file = fs.readFileSync(exportDir + "/translated.json");
      return JSON.parse(file);
    } catch (error) {
      return [];
    }

  }

  formatObj(obj) {

    obj.ID = parseInt(obj.ID);
    obj.Index = parseInt(obj.Index);

    return obj;
  }

  getEta(init, end) {
    const eta = makeEta({ min: init, max: end });
    eta.start();
    return eta;
  }

  setProgres(index, eta, max) {

    const percentage = ((index / max) * 100).toFixed(2);
    eta.report(index + 1);

    process.stdout.write(
      `Atualmente em ${percentage}% (${index}/${max}) do jogo traduzido - ${index++} de ${max} restantes - Aprox. ${(eta.estimate() / 60 / 60).toFixed(
        1
      )}hrs restantes.\r`
    );
  }

  async getNotTranslate() {

    let res = [];
    /*
        const arr = this.getJsonFile();
    
        for (let item of arr) {
    
          item = this.formatObj(item);
    
          const has = await mongo.findOne('textos', {
            ID: item.ID,
            Index: item.Index
          });
    
          if (!has) {
    
            item.cratedAt = new Date();
            const doc = await mongo.insertOne('textos', item);
    
            log.body(`Nova linha adicioanda ID: ${doc.insertedId}`);
            if (doc.insertedCount) {
              res.push(item);
            }
    
          } else {
            log.body(`ja existe ID: ${item.ID} INDEX: ${item.Index}`);
          }
        }
    */
    const arrtrns = this.getTranslatedJson();

    for (let iten of arrtrns) {
      iten = this.formatObj(iten);

      // "ID": "3427285",
      // "Unknown": "4",
      // "Index": "27",
      // "Offset": "1263",
      // "Text": "EMOTE: |c22ADDCocioso4",
      // "i": 99,
      // "Success": true

      const has = await mongo.findOne('textos', {
        ID: iten.ID,
        Index: iten.Index,
        Offset: iten.Offset
      });

      if (has && !has.TextPT) {

        has.TextPT = iten.Text;
        has.i = iten.i;
        has.Success = iten.Success;

        const doc = await mongo.updateOne(
          'textos',
          {
            _id: has._id
          },
          {
            cratedAt: new Date(),
            updatedAt: new Date(),
            TextPT: iten.Text,
            i: iten.i,
            Success: iten.Success
          }
        );

        log.body(`Nova linha adicioanda ID: ${doc.modifiedCount}`);

      }
    }

    const db = await mongo.getConn();
    db.close();

    return res;
  }
}

module.exports = (() => { return new utils() })();

