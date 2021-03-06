const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://alex.js:Aloucurae343@192.168.15.9:27017';
// Database Name
const dbName = 'esoTranslate';

let client;

module.exports = (function () {

    const getConn = async () => {

        if (!client) {

            client = await MongoClient.connect(url, {
                useNewUrlParser: true
                , useUnifiedTopology: true
            })
                .catch(err => { console.log(err); });

        }

        return client.db(dbName);
    };

    return {
        findOne: async (table, query) => {
            const db = await getConn();
            let collection = db.collection(table);
            return await collection.findOne(query);
        },
        insertOne: async (table, doc) => {
            const db = await getConn();
            let collection = db.collection(table);
            return await collection.insertOne(doc);
        },
        updateOne: async (table, myquery, values) => {

            const db = await getConn();
            let collection = db.collection(table);

            var newvalues = { $set: values };

            return await collection.updateOne(myquery, newvalues);
        },

        getConn: getConn
    };
})();
