"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeNewsletterQuery;

var _newsletter = _interopRequireDefault(require("./newsletter"));

var _errors = require("../helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeNewsletterQuery({
  database
}) {
  return Object.freeze({
    add,
    findById,
    getNewsletter,
    deleteById
  });

  async function getNewsletter({
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

    return (await db.collection('Newsletter').find(query).sort({
      date: -1
    }).limit(Number(max)).toArray()).map(documentToNewsletter);
  }

  async function add({
    newsletterId,
    ...newsletter
  }) {
    const db = await database;

    if (newsletterId) {
      newsletter._id = db.makeId(newsletterId);
    }

    const {
      result,
      ops
    } = await db.collection('Newsletter').insertOne(newsletter).catch(mongoError => {
      const [errorCode] = mongoError.message.split(' ');

      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
        throw new _errors.UniqueConstraintError(mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId');
      }

      throw mongoError;
    });
    return {
      success: result.ok === 1,
      created: documentToNewsletter(ops[0])
    };
  }

  async function findById({
    id
  }) {
    const db = await database;
    const found = await db.collection('Newsletter').findOne({
      _id: db.makeId(id)
    });

    if (found) {
      return documentToNewsletter(found);
    }

    return null;
  }

  async function deleteById({
    id
  }) {
    const db = await database;
    const {
      result
    } = await db.collection('Newsletter').deleteOne({
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

  function documentToNewsletter({
    _id: id,
    ...doc
  }) {
    return (0, _newsletter.default)({
      id,
      ...doc
    });
  }
}
//# sourceMappingURL=newsletter-query.js.map