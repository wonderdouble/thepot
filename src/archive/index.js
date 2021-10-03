import makeDb from '../db';
import makeArchiveQuery from './archive-query';
import makeArchiveEndpointHandler from './archive-endpoint';

const database = makeDb();
const archiveQuery = makeArchiveQuery({ database });
const archiveEndpointHandler = makeArchiveEndpointHandler({ archiveQuery });

export default archiveEndpointHandler;