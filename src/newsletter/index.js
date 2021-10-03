import makeDb from '../db';
import makeNewsletterQuery from './newsletter-query';
import makeNewsletterEndpointHandler from './newsletter-endpoint';

const database = makeDb();
const newsletterQuery = makeNewsletterQuery({ database });
const newsletterEndpointHandler = makeNewsletterEndpointHandler({ newsletterQuery });

export default newsletterEndpointHandler;