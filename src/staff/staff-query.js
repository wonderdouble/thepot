import makeStaff from './staff';
import { UniqueConstraintError } from '../helpers/errors';

export default function makeStaffQuery ({database}){
    return Object.freeze ({
        add,
        findById,
        findByEmail,
        findByDepartment,
        getStaff,
        deleteById,
        update
    });

    async function getStaff ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Staff')
        .find(query)
        .sort({date: -1})
        .limit(Number(max))
        .toArray()).map(documentToStaff)
    }


    async function add ({ staffId, ...staff }) {
        const db = await database
        if (staffId) {
          staff._id = db.makeId(staffId)
        }
        const { result, ops } = await db
          .collection('Staff')
          .insertOne(staff)
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
            created: documentToStaff(ops[0])
        }
    }


    async function update ({ id, ...staff }) {
      const db = await database
      const query = {
        _id: db.makeId(id)
      }

      const newSet = {
        $set : {
          lastname: staff.lastname, 
          othernames: staff.othernames,
          gender: staff.gender,
          email: staff.email,
          phone: staff.phone,
          birthDay: staff.birthDay,
          birthMonth: staff.birthMonth,
          address: staff.address,
          department: staff.department,
          bank: staff.bank,
          bank_account: staff.bank_account,
          kin_name: staff.kin_name,
          kin_phone: staff.kin_phone,
          kin_address: staff.kin_address,
          date: staff.date
        } 
      }
      
      const { result } = await db
        .collection('Staff')
        .updateOne(query, newSet, {upsert:true})
        

        if (result) {
          return {
            status: "success",
            message: "Updated successfully"
          }
        }
        else {
          return {
            status: "error",
            message: "Error updating"
          }
        }
      
    } 

    async function findById ({ id }) {
      const db = await database
      const found = await db
        .collection('Staff')
        .findOne({ _id: db.makeId(id) })
      if (found) {
        return documentToStaff(found)
      }
      return null
    }
    
    async function findByDepartment ({ department }) {
      const db = await database;
      
      return (await db
        .collection('Staff')
        .find({ department:department })
        .sort({date: -1})
        .toArray()).map(documentToStaff)
    }

    async function findByEmail ({ email }) {
      const db = await database;
      
      return (await db
        .collection('Staff')
        .find({ email:email })
        .sort({date: -1})
        .toArray()).map(documentToStaff)
    }

    async function deleteById ({ id }) {
      const db = await database

      const { result } = await db.collection('Staff').deleteOne({"_id": db.makeId(id)})
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

    function documentToStaff ({ _id: id, ...doc }) {
      return makeStaff({ id, ...doc })
    }
}