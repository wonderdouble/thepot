"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSubscriber;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSubscriber(subscriberInfo = (0, _requiredParam.default)('subscriberInfo')) {
  const validSubscriber = validate(subscriberInfo);
  const normalSubscriber = normalize(validSubscriber);
  return Object.freeze(normalSubscriber);

  function validate({ // estate_name = requiredParam('estate_name'),
    // name = requiredParam('name'),
    // email = requiredParam('email'),
    // estate_id = requiredParam('estate_id'),
    // phone = requiredParam('phone'),
    ...otherInfo
  } = {}) {
    // validateName('estate_name', estate_name);
    // validateName('name', name);
    // validateEmail(email);
    return { ...otherInfo
    };
  } // function validateName (label, name) {
  //   if (name.length < 2) {
  //     throw new InvalidPropertyError(
  //       `Subscriber's ${label} must be at least 2 characters long.`
  //     )
  //   }
  // }
  // function validateEmail(email){
  //   if (!isValidEmail(email)) {
  //       throw new InvalidPropertyError('Invalid contact email address.')
  //   }
  // }


  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo
    };
  }
}
//# sourceMappingURL=subscribers.js.map