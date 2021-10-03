"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _blogQuery = _interopRequireDefault(require("./blog-query"));

var _blogEndpoint = _interopRequireDefault(require("./blog-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const blogQuery = (0, _blogQuery.default)({
  database
});
const blogEndpointHandler = (0, _blogEndpoint.default)({
  blogQuery
});
var _default = blogEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map