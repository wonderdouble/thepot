"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

var _archiveQuery = _interopRequireDefault(require("./archive-query"));

var _archiveEndpoint = _interopRequireDefault(require("./archive-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = (0, _db.default)();
const archiveQuery = (0, _archiveQuery.default)({
  database
});
const archiveEndpointHandler = (0, _archiveEndpoint.default)({
  archiveQuery
});
var _default = archiveEndpointHandler;
exports.default = _default;
//# sourceMappingURL=index.js.map