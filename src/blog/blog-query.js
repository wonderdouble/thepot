import makeBlog from './blog'
import { UniqueConstraintError } from '../helpers/errors'

export default function makeBlogQuery({database}){
    return Object.freeze({
        add,
        findByAuthor,
        findByMin,
        findByTopic,
        findByDate,
        findById,
        getBlog,
        deleteById,
        update
    });

    async function getBlog ({ max = 100, before, after } = {}) {
        const db = await database;
        const query = {}
        if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db
        .collection('Blog')
        .find(query)
        .sort({date: -1})
        .limit(Number(max))
        .toArray()).map(documentToBlog)
    }


    async function add ({ blogId, ...blog }) {
        const db = await database
        if (blogId) {
          blog._id = db.makeId(blogId)
        }
        const { result, ops } = await db
          .collection('Blog')
          .insertOne(blog)
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
            created: documentToBlog(ops[0])
        }
    }

    async function findById ({ id }) {
      const db = await database
      const found = await db
        .collection('Blog')
        .findOne({ _id: db.makeId(id) })
      if (found) {
        return documentToBlog(found)
      }
      return null
    }

    async function findByMin({ min }) {
      const db = await database;
      
      return (await db
        .collection('Blog')
        .find()
        .sort({date: -1})
        .limit(Number(min))
        .toArray()).map(documentToBlog)
    }

    async function findByTopic({ topic }) {
      const db = await database;
      
      return (await db
        .collection('Blog')
        .find({ topic: topic })
        .sort({date: -1})
        .toArray()).map(documentToBlog)
    }
  
    async function findByAuthor ({ author }) {
      const db = await database;
      
      return (await db
        .collection('Blog')
        .find({ author : author })
        .sort({date: -1})
        .toArray()).map(documentToBlog)
    }

    async function findByDate ({ date }) {
      const db = await database;
      
      return (await db
        .collection('Blog')
        .find({ date : date })
        .toArray()).map(documentToBlog)
    }

    async function update ({ id, ...blog }) {
      const db = await database
      const query = {
        _id: db.makeId(id)
      }

      const newSet = {
        $set : {
          author: blog.category,
          topic: blog.topic,
          comment: blog.comment,
          upload: blog.upload,
          date: blog.date
        } 
      }
      
      const { result } = await db
        .collection('Blog')
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

    async function deleteById ({ id }) {
      const db = await database
  
      const { result } = await db.collection('Blog').deleteOne({"_id": db.makeId(id)})
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

    function documentToBlog ({ _id: id, ...doc }) {
      return makeBlog({ id, ...doc })
    }
}