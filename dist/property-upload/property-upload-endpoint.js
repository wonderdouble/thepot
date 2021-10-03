"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePropertyUploadEndpointHandler;

var _errors = require("../helpers/errors");

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _propertyUpload = _interopRequireDefault(require("./property-upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makePropertyUploadEndpointHandler({
  propertyUploadQuery
}) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postPropertyUpload(httpRequest);

      case 'GET':
        return getPropertyUpload(httpRequest);

      case 'PUT':
        return updatePropertyUpload(httpRequest);

      case 'DELETE':
        return deletePropertyUpload(httpRequest);

      default:
        return (0, _httpError.default)({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  };

  async function getPropertyUpload(httpRequest) {
    const {
      id
    } = httpRequest.queryParams || {};
    const {
      property_id
    } = httpRequest.queryParams || {};
    const {
      max,
      before,
      after
    } = httpRequest.queryParams || {};

    if (property_id !== undefined) {
      const result = await propertyUploadQuery.findByPropertyId({
        property_id
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } else if (id !== undefined) {
      const result = await propertyUploadQuery.findById({
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
      const result = await propertyUploadQuery.getPropertyUpload({
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

  async function postPropertyUpload(httpRequest) {
    let propertyUploadInfo = httpRequest.body;

    if (!propertyUploadInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        propertyUploadInfo = JSON.parse(propertyUploadInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const propertyUpload = (0, _propertyUpload.default)(propertyUploadInfo);
      const result = await propertyUploadQuery.add(propertyUpload);
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

  async function updatePropertyUpload(httpRequest) {
    let propertyUploadInfo = httpRequest.body;

    if (!propertyUploadInfo) {
      return (0, _httpError.default)({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        propertyUploadInfo = JSON.parse(propertyUploadInfo);
      } catch {
        return (0, _httpError.default)({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        });
      }
    }

    try {
      const propertyUpload = (0, _propertyUpload.default)(propertyUploadInfo);
      const result = await propertyUploadQuery.update(propertyUpload);
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

  async function deletePropertyUpload(httpRequest) {
    //const { customer_id } = httpRequest.pathParams || {}
    const {
      id
    } = httpRequest.queryParams || {};

    try {
      const result = await propertyUploadQuery.deleteById({
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
//# sourceMappingURL=property-upload-endpoint.js.map