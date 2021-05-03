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

  async getNotTranslate() {

    let res = [];

    const arr = this.getJsonFile();

    for (const item of arr) {

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

    const arrtrns = this.getTranslatedJson();

    for (const iten of arrtrns) {
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

      if (!has.TextPT) {

        has.TextPT = iten.Text;
        has.i = iten.i;
        has.Success = iten.Success;

        iten.cratedAt = new Date();
        iten.updatedAt = new Date();
        // const doc = await mongo.insertOne('textos', iten);

        log.body(`Nova linha adicioanda ID: ${doc.insertedId}`);
        if (doc.insertedCount) {
          res.push(iten);
        }

      }
    }

    return res;
  }
}

module.exports = (() => { return new utils() })();

