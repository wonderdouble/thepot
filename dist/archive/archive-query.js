"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeArchiveQuery;

var _archive = _interopRequireDefault(require("./archive"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeArchiveQuery({
  database
}) {
  return Object.freeze({
    add,
    findByEmail,
    findByTitle,
    findById,
    getArchive,
    update,
    deleteById
  });

  async function getArchive({
    max = 100,
    before,
    after
  } = {}) {
    const db = await database;
    const query = {};

    if (before || after) {
      query._id = {};
      query._id = before ? { ...query._id,
        $lt: db.makeId(before)
      } : query._id;
      query._id = after ? { ...query._id,
        $gt: db.makeId(after)
      } : query._id;
    }

    return (await db.collection('Archive').find(query).limit(Number(max)).toArray()).map(documentToArchive);
  }

  async function add({
    archiveId,
    ...archive
  }) {
    const db = await database;

    if (archiveId) {
      archive._id = db.makeId(archiveId);
    }

    const {
      result,
      ops
    } = await db.collection('Archive').insertOne(archive).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError(mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId');
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToArchive(ops[0])
    };
  }

  async function findById({
    id
  }) {
    const db = await database;
    const found = await db.collection('Archive').findOne({
      _id: db.makeId(id)
    });

    if (found) {
      return documentToArchive(found);
    }

    return null;
  }

  async function findByTitle({
    title
  }) {
    const db = await database;
    return (await db.collection('Archive').find({
      title: title
    }).toArray()).map(documentToArchive);
  }

  async function findByEmail({
    email
  }) {
    const db = await database;
    return (await db.collection('Archive').find({
      uploader_email: email
    }).toArray()).map(documentToArchive);
  }

  async function update({
    id,
    ...archive
  }) {
    const db = await database;
    const query = {
      _id: db.makeId(id)
    };
    const newSet = {
      $set: {
        title: archive.title,
        caption: property.caption,
        uploader_email: property.uploader_email,
        upload: property.upload,
        date: property.date
      }
    };
    const {
      result
    } = await db.collection('Archive').updateOne(query, newSet, {
      upsert: true
    });

    if (result) {
      return {
        status: "success",
        message: "Updated successfully"
      };
    } else {
      return {
        status: "error",
        message: "Error updating"
      };
    }
  }

  async function deleteById({
    id
  }) {
    const db = await database;
    const {
      result
    } = await db.collection('Archive').deleteOne({
      "_id": db.makeId(id)
    });

    if (result.n > 0) {
      return {
        status: "Success"
      };
    } else {
      return {
        status: "Error"
      };
    }
  }

  function documentToArchive({
    _id: id,
    ...doc
  }) {
    return (0, _archive.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=archive-query.js.map