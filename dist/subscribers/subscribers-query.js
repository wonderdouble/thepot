"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSubscribersQuery;

var _subscribers = _interopRequireDefault(require("./subscribers"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSubscribersQuery({
  database
}) {
  return Object.freeze({
    add,
    findById,
    findByEstateName,
    findByEstateId,
    findByEmail,
    getSubscribers,
    deleteById,
    update
  });

  async function getSubscribers({
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

    return (await db.collection('Subscriber').find(query).sort({
      date: -1
    }).limit(Number(max)).toArray()).map(documentToSubscribers);
  }

  async function add({
    subscribersId,
    ...subscribers
  }) {
    const db = await database;

    if (subscribersId) {
      subscribers._id = db.makeId(subscribersId);
    }

    const {
      result,
      ops
    } = await db.collection('Subscriber').insertOne(subscribers).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError();
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToSubscribers(ops[0])
    };
  }

  async function update({
    id,
    ...subscribers
  }) {
    const db = await database;
    const query = {
      _id: db.makeId(id)
    };
    const newSet = {
      $set: {
        estate_name: subscribers.estate_name,
        estate_id: subscribers.estate_id,
        email: subscribers.email,
        phone: subscribers.phone,
        name: subscribers.name,
        date: subscribers.date
      }
    };
    const {
      result
    } = await db.collection('Subscriber').updateOne(query, newSet, {
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

  async function findById({
    id
  }) {
    const db = await database;
    const found = await db.collection('Subscriber').findOne({
      _id: db.makeId(id)
    });

    if (found) {
      return documentToSubscribers(found);
    }

    return null;
  }

  async function findByEstateName({
    estate_name
  }) {
    const db = await database;
    return (await db.collection('Subscriber').find({
      estate_name: estate_name
    }).sort({
      date: -1
    }).toArray()).map(documentToSubscribers);
  }

  async function findByEstateId({
    estate_id
  }) {
    const db = await database;
    return (await db.collection('Subscriber').find({
      estate_id: estate_nameid
    }).sort({
      date: -1
    }).toArray()).map(documentToSubscribers);
  }

  async function findByEmail({
    email
  }) {
    const db = await database;
    return (await db.collection('Subscriber').find({
      email: email
    }).sort({
      date: -1
    }).toArray()).map(documentToSubscribers);
  }

  async function deleteById({
    id
  }) {
    const db = await database;
    const {
      result
    } = await db.collection('Subscriber').deleteOne({
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

  function documentToSubscribers({
    _id: id,
    ...doc
  }) {
    return (0, _subscribers.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=subscribers-query.js.map