import makeDb from '../db';
import makePropertyUploadQuery from './property-upload-query';
import makePropertyUploadEndpointHandler from './property-upload-endpoint';

const database = makeDb();
const propertyUploadQuery = makePropertyUploadQuery({ database });
const propertyUploadEndpointHandler = makePropertyUploadEndpointHandler({ propertyUploadQuery });

export default propertyUploadEndpointHandler;