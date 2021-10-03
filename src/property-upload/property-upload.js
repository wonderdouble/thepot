import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makePropertyUpload(
    propertyUploadInfo = requiredParam('propertyUploadInfo')
){
    
    const validProperty = validate(propertyUploadInfo);
    const normalPropertyUpload = normalize(validProperty);
    return Object.freeze(normalPropertyUpload);

    function validate ({
        // topic = requiredParam('topic'),
        // caption = requiredParam('caption'),
        // house_details_name = requiredParam('house_details_name'),
        // house_id = requiredParam('house_id'),
        // upload = requiredParam('upload'),
        ...otherInfo
    } = {}) {
        
        return { ...otherInfo }
    }

    function validateName (label, name) {
        if (name.length < 2) {
            throw new InvalidPropertyError(
            `Property upload's ${label} must be at least 2 characters long.`
            )
        }
    }

    function normalize ({ ...otherInfo }) {
        
        return {
            ...otherInfo
        }
    }
    
}
