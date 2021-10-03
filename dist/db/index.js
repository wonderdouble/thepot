"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDb;

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

async function makeDb() {
  const MongoClient = _mongodb.default.MongoClient;
  const url = process.env.DATABASE_URL;
  const dbName = 'pragmatic';
  const client = new MongoClient(url, {
    useUnifiedTopology: true
  }); //await client.connect()

  try {
    await client.connect(); //await listDatabases(client);
  } catch (e) {
    console.error(e);
  }

  const db = await client.db(dbName);
  db.makeId = makeIdFromString;
  return db;
}

function makeIdFromString(id) {
  return new _mongodb.default.ObjectID(id);
}
//# sourceMappingURL=index.js.map