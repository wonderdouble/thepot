"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _propertyUploadQuery = _interopRequireDefault(require("./property-upload-query"));

var _propertyUploadEndpoint = _interopRequireDefault(require("./property-upload-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const propertyUploadQuery = (0, _propertyUploadQuery.default)({
  database
});
const propertyUploadEndpointHandler = (0, _propertyUploadEndpoint.default)({
  propertyUploadQuery
});
var _default = propertyUploadEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map