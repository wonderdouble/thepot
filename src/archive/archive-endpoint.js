import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makeArchive from './archive';

export default function makeArchiveEndpointHandler({archiveQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postArchive(httpRequest)
      
            case 'GET':
              return getArchive(httpRequest)

            case 'DELETE':
              return deleteArchive(httpRequest)

            case 'PUT':
              return updateArchive(httpRequest)
      
            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getArchive (httpRequest) {
      const { id } = httpRequest.queryParams || {}
      const { title } = httpRequest.queryParams || {} 
      const { email } = httpRequest.queryParams || {}
      const { max, before, after } = httpRequest.queryParams || {}
  
      if (title !== undefined){
        const result = await archiveQuery.findByTitle({ title })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else if (email !== undefined ){
        const result = await archiveQuery.findByEmail({ email})
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        } 
  
      }
      else if (id !== undefined ){
        const result = await archiveQuery.findById({ id })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else {
        const result = await archiveQuery.getArchive({ max, before, after })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
        
      }
        
    }

    async function postArchive (httpRequest) {
        let archiveInfo = httpRequest.body
        if (!archiveInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            archiveInfo = JSON.parse(archiveInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const archive = makeArchive(archiveInfo)
          const result = await archiveQuery.add(archive)
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 201,
            data: JSON.stringify(result)
          }
        } catch (e) {
          return makeHttpError({
            errorMessage: e.message,
            statusCode:
              e instanceof UniqueConstraintError
                ? 409
                : e instanceof InvalidPropertyError ||
                  e instanceof RequiredParameterError
                  ? 400
                  : 500
          })
        }
    }

    async function updateArchive (httpRequest) {
    
      let archiveInfo = httpRequest.body
      
      if (!archiveInfo) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. No POST body.'
        })
      }
  
      if (typeof httpRequest.body === 'string') {
        try {
          archiveInfo = JSON.parse(archiveInfo)
        } catch {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. POST body must be valid JSON.'
          })
        }
      }
  
      try {
        const archive = makeArchive(archiveInfo);
        const result = await archiveQuery.update(archive)
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 201,
          data: JSON.stringify(result)
        }
      } catch (e) {
        return makeHttpError({
          errorMessage: e.message,
          statusCode:
            e instanceof UniqueConstraintError
              ? 409
              : e instanceof InvalidPropertyError ||
                e instanceof RequiredParameterError
                ? 400
                : 500
        })
      }
    }
  
    async function deleteArchive (httpRequest) {
      const { id } = httpRequest.queryParams || {}
  
      try {
        const result = await archiveQuery.deleteById({ id })
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
      }
      catch (e){
        return makeHttpError({
          errorMessage: e.message,
          statusCode:
            e instanceof UniqueConstraintError
              ? 409
              : e instanceof InvalidPropertyError ||
                e instanceof RequiredParameterError
                ? 400
                : 500
        })

      }
      
    }
  
  }