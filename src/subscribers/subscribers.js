import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeSubscriber(
    subscriberInfo = requiredParam('subscriberInfo')
){
    
    const validSubscriber = validate(subscriberInfo);
    const normalSubscriber = normalize(validSubscriber);
    return Object.freeze(normalSubscriber);

  
    function validate ({
        // estate_name = requiredParam('estate_name'),
        // name = requiredParam('name'),
        // email = requiredParam('email'),
        // estate_id = requiredParam('estate_id'),
        // phone = requiredParam('phone'),
        ...otherInfo
      } = {}) {
        // validateName('estate_name', estate_name);
        // validateName('name', name);
        // validateEmail(email);
        return { ...otherInfo }
      }
    
      // function validateName (label, name) {
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

      function normalize ({ ...otherInfo }) {
        return {
          ...otherInfo
        }
      }
}
