"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeProperty;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeProperty(propertyInfo = (0, _requiredParam.default)('propertyInfo')) {
  const validProperty = validate(propertyInfo);
  const normalProperty = normalize(validProperty);
  return Object.freeze(normalProperty);

  function validate({ // estate = requiredParam('estate'),
    // caption = requiredParam('caption'),
    // location = requiredParam('location'),
    // documentation = requiredParam('documentation'),
    // features = requiredParam('features'),
    // price = requiredParam('price'),
    // upload = requiredParam('upload'),
    ...otherInfo
  } = {}) {
    // validateName('estate', estate)
    // validateName('caption', caption)
    // validateName('location', location)
    return { ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Property's ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({ ...otherInfo
  }) {
    return { ...otherInfo // estate: upperFirst(estate),
      // caption: upperFirst(caption),
      // location: upperFirst(location)

    };
  } // function formatPrice(price){
  //     var formatter = new Intl.NumberFormat('en-NG', {
  //         style: 'currency',
  //         currency: 'NGN',
  //     });
  //     return formatter.price;
  // }

}
//# sourceMappingURL=property.js.map