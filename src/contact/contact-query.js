import makeContact from './contact'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeContactQuery({database}){
    return Object.freeze({
        add,
        findByEmail,
        findByPhone,
        findById,
        findByDate,
        getContact,
        deleteById
    });

    async function getContact ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Contact')
        .find(query)
        .limit(Number(max))
        .toArray()).map(documentToContact)
    }


    async function add ({ id, ...contact }) {
        const db = await database
        if (id) {
          contact._id = db.makeId(id)
        }
        const { result, ops } = await db
          .collection('Contact')
          .insertOne(contact)
          .catch(mongoError => {
            const [errorCode] = mongoError.message.split(' ')
            if (errorCode === 'E11000') {
              const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
              throw new UniqueConstraintError(
                mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
              )
            }
            throw mongoError
          })
        return {
            success: result.ok === 1,
            created: documentToContact(ops[0])
        }
    }
    
    async function findById ({ id }) {
      const db = await database
      const found = await db
        .collection('Contact')
        .findOne({ _id: db.makeId(id) })
      if (found) {
        return documentToContact(found)
      }
      return null
    }

    async function findByEmail({ email }) {
      const db = await database;
      
      return (await db
        .collection('Contact')
        .find({ email: email })
        .toArray()).map(documentToContact)
    }
  
    async function findByPhone ({ phone }) {
      const db = await database;
      
      return (await db
        .collection('Contact')
        .find({ phone : phone })
        .toArray()).map(documentToContact)
    }

    async function findByDate ({ date }) {
      const db = await database;
      
      return (await db
        .collection('Contact')
        .find({ date : date })
        .toArray()).map(documentToContact)
    }

    async function deleteById ({ id }) {
      const db = await database
  
      const { result } = await db.collection('Contact').deleteOne({"_id": db.makeId(id)})
      if (result.n > 0){
        return {
          status: "Success"
        }
      }
      else {
        return {
          status: "Error"
        }
      }
    }

    function documentToContact ({ _id: id, ...doc }) {
      return makeContact({ id, ...doc })
    }
}