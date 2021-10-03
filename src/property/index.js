import makeDb from '../db';
import makePropertyQuery from './property-query';
import makePropertyEndpointHandler from './property-endpoint';

const database = makeDb();
const propertyQuery = makePropertyQuery({ database });
const propertyEndpointHandler = makePropertyEndpointHandler({ propertyQuery });

export default propertyEndpointHandler;