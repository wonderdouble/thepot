"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _newsletterQuery = _interopRequireDefault(require("./newsletter-query"));

var _newsletterEndpoint = _interopRequireDefault(require("./newsletter-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const newsletterQuery = (0, _newsletterQuery.default)({
  database
});
const newsletterEndpointHandler = (0, _newsletterEndpoint.default)({
  newsletterQuery
});
var _default = newsletterEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map