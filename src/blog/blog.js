import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeBlog(
    blogInfo = requiredParam('blogInfo')
){
    
    const validBlog = validate(blogInfo);
    const normalBlog= normalize(validBlog);
    return Object.freeze(normalBlog);

    function validate ({
        author = requiredParam('author'),
        topic = requiredParam('topic'),
        comment = requiredParam('comment'),
        ...otherInfo
      } = {}) {
        validateName('author', author)
        validateName('topic', topic)
        return { author, topic, comment, ...otherInfo }
      }
    
      function validateName (label, name) {
        if (name.length < 2) {
          throw new InvalidPropertyError(
            `Blog's ${label} must be at least 2 characters long.`
          )
        }
      }

      function normalize ({ author, topic, comment, ...otherInfo }) {
        return {
          ...otherInfo,
          author: upperFirst(author),
          topic: upperFirst(topic),
          comment: comment.replace(/(?:\r\n|\r|\n)/g, '<br>')
        }
      }
}
