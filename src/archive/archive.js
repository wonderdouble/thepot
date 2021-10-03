import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import upperFirst from '../helpers/upper-first';

export default function makeArchive(
    archiveInfo = requiredParam('archiveInfo')
){
    
    const validArchive = validate(archiveInfo);
    const normalArchive= normalize(validArchive);
    return Object.freeze(normalArchive);

    function validate ({...otherInfo
      } = {}) {
        return { ...otherInfo }
      }
     
      function normalize ({ ...otherInfo }) {
        return {
          ...otherInfo
        }
      }
}
