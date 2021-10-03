import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeContact(
    contactInfo = requiredParam('contactInfo')
){
    
    const validContact = validate(contactInfo);
    const normalContact = normalize(validContact);
    return Object.freeze(normalContact);

   
    function validate ({
        name = requiredParam('name'),
        //email = requiredParam('email'),
        //phone = requiredParam('phone'),
        topic = requiredParam('topic'),
        comment = requiredParam('comment'),
        ...otherInfo
    } = {}) {
        validateName('name', name);
        validateName('topic', topic);
        validateName('comment', comment);
        //validateEmail(email);
        return { name, topic, comment, ...otherInfo }
    }

    function validateName (label, name) {
        if (name.length < 2) {
            throw new InvalidPropertyError(
            `Contact ${label} must be at least 2 characters long.`
            )
        }
    }

    function validateEmail(email){
        if (!isValidEmail(email)) {
            throw new InvalidPropertyError('Invalid contact email address.')
        }
    }

    function normalize ({ name, topic, comment, ...otherInfo }) {
        return {
            ...otherInfo,
            name: upperFirst(name),
            topic: upperFirst(topic),
            comment: comment.replace(/(?:\r\n|\r|\n)/g, '<br>')
        }
    }
    
}
