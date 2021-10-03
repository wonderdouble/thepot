"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeArchive;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeArchive(archiveInfo = (0, _requiredParam.default)('archiveInfo')) {
  const validArchive = validate(archiveInfo);
  const normalArchive = normalize(validArchive);
  return Object.freeze(normalArchive);

  function validate({ ...otherInfo
  } = {}) {
    return { ...otherInfo
    };
  }

  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo
    };
  }
}
//# sourceMappingURL=archive.js.map