"use strinct"
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const path = require('path');
const mongo = require('../db/mongo');
const log = require('../log/log');


class utils {
  getJsonFile = () => {

    const exportDir = path.resolve(__dirname, "../extract/gamedata/lang");
    const file = fs.readFileSync(exportDir + "/en.lang.csv");

    const array = parse(file, {
      columns: true,
      skip_empty_lines: true
    });

    return array;
  }

  getNotTranslate = async () => {

    let res = [];

    const arr = this.getJsonFile();

    for (const item of arr) {

      item.ID = parseInt(item.ID);
      item.Index = parseInt(item.Index);

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

    return res;
  }
}

module.exports = (() => { return new utils() })();

