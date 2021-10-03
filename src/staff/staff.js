import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeStaff(
    staffInfo = requiredParam('staffInfo')
){
    
    const validStaff = validate(staffInfo);
    const normalStaff = normalize(validStaff);
    return Object.freeze(normalStaff);

    
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
