"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeNewsletterEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _newsletter = _interopRequireDefault(require("./newsletter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeNewsletterEndpointHandler({
  newsletterQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postNewsletter(httpRequest);

      case 'GET':
        return getNewsletter(httpRequest);

      case 'DELETE':
        return deleteNewsletter(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getNewsletter(httpRequest) {
    const {
      id
    } = httpRequest.pathParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};
    const result = id ? await newsletterQuery.findById({
      newsletterId: id
    }) : await newsletterQuery.getNewsletter({
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

  async function postNewsletter(httpRequest) {
    let newsletterInfo = httpRequest.body;

    if (!newsletterInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        newsletterInfo = JSON.parse(newsletterInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const newsletter = (0, _newsletter.default)(newsletterInfo);
      const result = await newsletterQuery.add(newsletter);
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

  async function deleteNewsletter(httpRequest) {
    //const { customer_id } = httpRequest.pathParams || {}
    const {
      id
    } = httpRequest.queryParams || {};

    try {
      const result = await newsletterQuery.deleteById({
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
//# sourceMappingURL=newsletter-endpoint.js.map