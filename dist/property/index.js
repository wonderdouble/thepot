"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _propertyQuery = _interopRequireDefault(require("./property-query"));

var _propertyEndpoint = _interopRequireDefault(require("./property-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const propertyQuery = (0, _propertyQuery.default)({
  database
});
const propertyEndpointHandler = (0, _propertyEndpoint.default)({
  propertyQuery
});
var _default = propertyEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map