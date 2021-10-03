require('dotenv').config();
import mongodb from 'mongodb';

export default async function makeDb () {
  const MongoClient = mongodb.MongoClient
  const url = process.env.DATABASE_URL;
  const dbName = 'pragmatic'
  const client = new MongoClient(url, { useUnifiedTopology: true })
  //await client.connect()

  try {
    await client.connect();
    //await listDatabases(client);
  } catch (e) {
      console.error(e);
  }
  
  const db = await client.db(dbName)
  db.makeId = makeIdFromString
  return db
}

function makeIdFromString (id) {
  return new mongodb.ObjectID(id)
}