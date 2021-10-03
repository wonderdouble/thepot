"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeNewsletter;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeNewsletter(newsletterInfo = (0, _requiredParam.default)('newsletterInfo')) {
  const validNewsletter = validate(newsletterInfo);
  const normalNewletter = normalize(validNewsletter);
  return Object.freeze(normalNewletter);

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
//# sourceMappingURL=newsletter.js.map