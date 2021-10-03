import makeDb from '../db';
import makeBlogQuery from './blog-query';
import makeBlogEndpointHandler from './blog-endpoint';

const database = makeDb();
const blogQuery = makeBlogQuery({ database });
const blogEndpointHandler = makeBlogEndpointHandler({ blogQuery });

export default blogEndpointHandler;