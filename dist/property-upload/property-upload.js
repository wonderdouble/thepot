"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePropertyUpload;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makePropertyUpload(propertyUploadInfo = (0, _requiredParam.default)('propertyUploadInfo')) {
  const validProperty = validate(propertyUploadInfo);
  const normalPropertyUpload = normalize(validProperty);
  return Object.freeze(normalPropertyUpload);

  function validate({ // topic = requiredParam('topic'),
    // caption = requiredParam('caption'),
    // house_details_name = requiredParam('house_details_name'),
    // house_id = requiredParam('house_id'),
    // upload = requiredParam('upload'),
    ...otherInfo
  } = {}) {
    return { ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Property upload's ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo
    };
  }
}
//# sourceMappingURL=property-upload.js.map