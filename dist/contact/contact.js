"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeContact;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeContact(contactInfo = (0, _requiredParam.default)('contactInfo')) {
  const validContact = validate(contactInfo);
  const normalContact = normalize(validContact);
  return Object.freeze(normalContact);

  function validate({
    name = (0, _requiredParam.default)('name'),
    //email = requiredParam('email'),
    //phone = requiredParam('phone'),
    topic = (0, _requiredParam.default)('topic'),
    comment = (0, _requiredParam.default)('comment'),
    ...otherInfo
  } = {}) {
    validateName('name', name);
    validateName('topic', topic);
    validateName('comment', comment); //validateEmail(email);

    return {
      name,
      topic,
      comment,
      ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Contact ${label} must be at least 2 characters long.`);
    }
  }

  function validateEmail(email) {
    if (!(0, _isValidEmail.default)(email)) {
      throw new _errors.InvalidPropertyError('Invalid contact email address.');
    }
  }

  function normalize({
    name,
    topic,
    comment,
    ...otherInfo
  }) {
    return { ...otherInfo,
      name: (0, _upperFirst.default)(name),
      topic: (0, _upperFirst.default)(topic),
      comment: comment.replace(/(?:\r\n|\r|\n)/g, '<br>')
    };
  }
}
//# sourceMappingURL=contact.js.map