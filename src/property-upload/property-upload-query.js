import makePropertyUpload from './property-upload'
import { UniqueConstraintError } from '../helpers/errors'

export default function makePropertyUploadQuery({database}){
    return Object.freeze({
        add,
        findById,
        findByPropertyId,
        getPropertyUpload,
        deleteById,
        update
    });

    async function getPropertyUpload ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
          query._id = {}
          query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
          query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('HouseUpload')
        .find(query)
        .sort({date: -1})
        .limit(Number(max))
        .toArray()).map(documentToPropertyUpload)
    }


    async function add ({ id, ...propertyUpload }) {
        const db = await database
        if (id) {
          propertyUpload._id = db.makeId(id)
        }
        const { result, ops } = await db
          .collection('HouseUpload')
          .insertOne(propertyUpload)
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
            created: documentToPropertyUpload(ops[0])
        }
    }


    async function update ({ id, ...propertyUpload }) {
        const db = await database
        if (id) {
          propertyUpload._id = db.makeId(id)
        }
        const { result, ops } = await db
          .collection('HouseUpload')
          .updateOne(propertyUploadId, propertyUpload, {upsert:true})
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
            created: documentToPropertyUpload(ops[0])
        }
    }

    async function findById ({ id }) {
        const db = await database
        const found = await db
          .collection('HouseUpload')
          .findOne({ _id: db.makeId(id) })
        if (found) {
          return documentToPropertyUpload(found)
        }
        return null
      }


      async function findByPropertyId({ property_id }) {
        const db = await database;
  
        return (await db
          .collection('HouseUpload')
          .find({ property_id: property_id})
          .sort({date: -1})
          .toArray()).map(documentToPropertyUpload)
      }


      async function deleteById ({ id }) {
        const db = await database
    
        const { result } = await db.collection('HouseUpload').deleteOne({"_id": db.makeId(id)})
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

    function documentToPropertyUpload ({ _id: id, ...doc }) {
      return makePropertyUpload({ id, ...doc })
    }
}