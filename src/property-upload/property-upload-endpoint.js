import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makePropertyUpload from './property-upload';

export default function makePropertyUploadEndpointHandler({propertyUploadQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postPropertyUpload(httpRequest)
      
            case 'GET':
              return getPropertyUpload(httpRequest)

            case 'PUT':
                return updatePropertyUpload(httpRequest)

            case 'DELETE':
              return deletePropertyUpload(httpRequest)
      
            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getPropertyUpload (httpRequest) {
      const { id } = httpRequest.queryParams || {}
      const { property_id } = httpRequest.queryParams || {}
      const { max, before, after } = httpRequest.queryParams || {}
  
      if (property_id !== undefined){
        const result = await propertyUploadQuery.findByPropertyId({ property_id })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else if (id !== undefined ){
        const result = await propertyUploadQuery.findById({ id })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else {
        const result = await propertyUploadQuery.getPropertyUpload({ max, before, after })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
        
      }
        
    }

    async function postPropertyUpload (httpRequest) {
        let propertyUploadInfo = httpRequest.body
        if (!propertyUploadInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            propertyUploadInfo = JSON.parse(propertyUploadInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const propertyUpload = makePropertyUpload(propertyUploadInfo)
          const result = await propertyUploadQuery.add(propertyUpload)
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


    async function updatePropertyUpload (httpRequest) {
        let propertyUploadInfo = httpRequest.body
        if (!propertyUploadInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            propertyUploadInfo = JSON.parse(propertyUploadInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const propertyUpload = makePropertyUpload(propertyUploadInfo)
          const result = await propertyUploadQuery.update(propertyUpload)
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

    async function deletePropertyUpload (httpRequest) {
      //const { customer_id } = httpRequest.pathParams || {}
      const { id } = httpRequest.queryParams || {}
      try {
        const result = await propertyUploadQuery.deleteById({ id })
  
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