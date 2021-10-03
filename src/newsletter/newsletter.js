import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeNewsletter(
    newsletterInfo = requiredParam('newsletterInfo')
){
    const validNewsletter = validate(newsletterInfo);
    const normalNewletter = normalize(validNewsletter);
    return Object.freeze(normalNewletter);
    
    function validate ({
        ...otherInfo
    } = {}) {
        
        return { 
            ...otherInfo 
        }
    }

    function normalize ({ 
        ...otherInfo }) {
        
        return {
            ...otherInfo
        }
    }
    
}
