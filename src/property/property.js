import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeProperty(
    propertyInfo = requiredParam('propertyInfo')
){
    
    const validProperty = validate(propertyInfo);
    const normalProperty= normalize(validProperty);
    return Object.freeze(normalProperty);

    function validate ({
        // estate = requiredParam('estate'),
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
        return { ...otherInfo }
    }

    function validateName (label, name) {
        if (name.length < 2) {
            throw new InvalidPropertyError(
            `Property's ${label} must be at least 2 characters long.`
            )
        }
    }

    function normalize ({ ...otherInfo }) {
        return {
            ...otherInfo,
            // estate: upperFirst(estate),
            // caption: upperFirst(caption),
            // location: upperFirst(location)
        }
    }

    // function formatPrice(price){
    //     var formatter = new Intl.NumberFormat('en-NG', {
    //         style: 'currency',
    //         currency: 'NGN',
    //     });

    //     return formatter.price;
    // }
}
