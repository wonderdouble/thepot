"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePropertyQuery;

var _property = _interopRequireDefault(require("./property"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makePropertyQuery({
  database
}) {
  return Object.freeze({
    add,
    findById,
    findByMin,
    findByEstate,
    findByStatus,
    getProperty,
    deleteById,
    update
  });

  async function getProperty({
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

    return (await db.collection('House').find(query).sort({
      date: -1
    }).limit(Number(max)).toArray()).map(documentToProperty);
  }

  async function add({
    id,
    ...property
  }) {
    const db = await database;

    if (id) {
      property._id = db.makeId(id);
    }

    const {
      result,
      ops
    } = await db.collection('House').insertOne(property).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError(mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId');
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToProperty(ops[0])
    };
  }

  async function findById({
    id
  }) {
    const db = await database;
    const found = await db.collection('House').findOne({
      _id: db.makeId(id)
    });

    if (found) {
      return documentToProperty(found);
    }

    return null;
  }

  async function findByMin({
    min
  }) {
    const db = await database;
    return (await db.collection('House').find().sort({
      date: -1
    }).limit(Number(min)).toArray()).map(documentToProperty);
  }

  async function findByEstate({
    estate
  }) {
    const db = await database;
    return (await db.collection('House').find({
      estate: estate
    }).sort({
      date: -1
    }).toArray()).map(documentToProperty);
  }

  async function findByStatus({
    status
  }) {
    const db = await database;
    return (await db.collection('House').find({
      status: status
    }).sort({
      date: -1
    }).toArray()).map(documentToProperty);
  }

  async function update({
    id,
    ...property
  }) {
    const db = await database;
    const query = {
      _id: db.makeId(id)
    };
    const newSet = {
      $set: {
        category: property.category,
        estate: property.estate,
        caption: property.caption,
        location: property.location,
        documentation: property.documentation,
        features: property.features,
        video: property.video,
        price: property.price,
        upload: property.upload,
        status: property.status,
        date: property.date
      }
    };
    const {
      result
    } = await db.collection('House').updateOne(query, newSet, {
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
    } = await db.collection('House').deleteOne({
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

  function documentToProperty({
    _id: id,
    ...doc
  }) {
    return (0, _property.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=property-query.js.map