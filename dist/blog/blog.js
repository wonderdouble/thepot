"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBlog;

var _requiredParam = _interopRequireDefault(require("../helpers/required-param"));

var _errors = require("../helpers/errors");

var _isValidEmail = _interopRequireDefault(require("../helpers/is-valid-email.js"));

var _upperFirst = _interopRequireDefault(require("../helpers/upper-first"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeBlog(blogInfo = (0, _requiredParam.default)('blogInfo')) {
  const validBlog = validate(blogInfo);
  const normalBlog = normalize(validBlog);
  return Object.freeze(normalBlog);

  function validate({
    author = (0, _requiredParam.default)('author'),
    topic = (0, _requiredParam.default)('topic'),
    comment = (0, _requiredParam.default)('comment'),
    ...otherInfo
  } = {}) {
    validateName('author', author);
    validateName('topic', topic);
    return {
      author,
      topic,
      comment,
      ...otherInfo
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new _errors.InvalidPropertyError(`Blog's ${label} must be at least 2 characters long.`);
    }
  }

  function normalize({
    author,
    topic,
    comment,
    ...otherInfo
  }) {
    return { ...otherInfo,
      author: (0, _upperFirst.default)(author),
      topic: (0, _upperFirst.default)(topic),
      comment: comment.replace(/(?:\r\n|\r|\n)/g, '<br>')
    };
  }
}
//# sourceMappingURL=blog.js.map