"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSubscribersEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _subscribers = _interopRequireDefault(require("./subscribers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSubscribersEndpointHandler({
  subscribersQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postSubscribers(httpRequest);

      case 'GET':
        return getSubscribers(httpRequest);

      case 'PUT':
        return updateSubscribers(httpRequest);

      case 'DELETE':
        return deleteSubscriber(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getSubscribers(httpRequest) {
    const {
      id
    } = httpRequest.queryParams || {};
    const {
      estate_name
    } = httpRequest.queryParams || {};
    const {
      estate_id
    } = httpRequest.queryParams || {};
    const {
      email
    } = httpRequest.queryParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};

    if (estate_name !== undefined) {
      const result = await subscribersQuery.findByEstateName({
        estate_name
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else if (estate_id !== undefined) {
      const result = await subscribersQuery.findByEstateId({
        estate_id
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else if (email !== undefined) {
      const result = await subscribersQuery.findByEmail({
        email
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else if (id !== undefined) {
      const result = await subscribersQuery.findById({
        id
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else {
      const result = await subscribersQuery.getSubscribers({
        max,
        before,
        after
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    }
  }

  async function postSubscribers(httpRequest) {
    let subscribersInfo = httpRequest.body;

    if (!subscribersInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        subscribersInfo = JSON.parse(subscribersInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const subscribers = (0, _subscribers.default)(subscribersInfo);
      const result = await subscribersQuery.add(subscribers);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      };
    } catch (e) {
      return (0, _httpError.default)({
        errorMessage: e.message,
        statusCode: e instanceof _errors.UniqueConstraintError ? 409 : e instanceof _errors.InvalidPropertyError || e instanceof _errors.RequiredParameterError ? 400 : 500
      });
    }
  }

  async function updateSubscribers(httpRequest) {
    let subscribersInfo = httpRequest.body;

    if (!subscribersInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        subscribersInfo = JSON.parse(subscribersInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const subscribers = (0, _subscribers.default)(subscribersInfo);
      const result = await subscribersQuery.update(subscribers);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      };
    } catch (e) {
      return (0, _httpError.default)({
        errorMessage: e.message,
        statusCode: e instanceof _errors.UniqueConstraintError ? 409 : e instanceof _errors.InvalidPropertyError || e instanceof _errors.RequiredParameterError ? 400 : 500
      });
    }
  }

  async function deleteSubscriber(httpRequest) {
    const {
      id
    } = httpRequest.queryParams || {};

    try {
      const result = await subscribersQuery.deleteById({
        id
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } catch (e) {
      return (0, _httpError.default)({
        errorMessage: e.message,
        statusCode: e instanceof _errors.UniqueConstraintError ? 409 : e instanceof _errors.InvalidPropertyError || e instanceof _errors.RequiredParameterError ? 400 : 500
      });
    }
  }
}
//# sourceMappingURL=subscribers-endpoint.js.map