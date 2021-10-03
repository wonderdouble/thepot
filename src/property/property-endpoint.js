import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makeProperty from './property';

export default function makePropertyEndpointHandler({propertyQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postProperty(httpRequest)
      
            case 'GET':
              return getProperty(httpRequest)

            case 'PUT':
              return updateProperty(httpRequest)

            case 'DELETE':
              return deleteProperty(httpRequest)
      
            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getProperty (httpRequest) {
      const { id } = httpRequest.queryParams || {}
      const { min } = httpRequest.queryParams || {} 
      const { estate } = httpRequest.queryParams || {}
      const { status } = httpRequest.queryParams || {}
      const { max, before, after } = httpRequest.queryParams || {}
  
      if (min !== undefined){
        const result = await propertyQuery.findByMin({ min })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else if (estate !== undefined ){
        const result = await propertyQuery.findByEstate({ estate})
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        } 
  
      }
      else if (status !== undefined ){
        const result = await propertyQuery.findByStatus({ status })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        } 
  
      }
      else if (id !== undefined ){
        const result = await propertyQuery.findById({ id })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else {
        const result = await propertyQuery.getProperty({ max, before, after })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
        
      }
        
    }


    async function postProperty (httpRequest) {
        let propertyInfo = httpRequest.body
        if (!propertyInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            propertyInfo = JSON.parse(propertyInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const property = makeProperty(propertyInfo)
          const result = await propertyQuery.add(property)
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


    async function updateProperty (httpRequest) {
        let propertyInfo = httpRequest.body
        if (!propertyInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            propertyInfo = JSON.parse(propertyInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const property = makeProperty(propertyInfo)
          const result = await propertyQuery.update(property)
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


    async function deleteProperty (httpRequest) {
      //const { customer_id } = httpRequest.pathParams || {}
      const { id } = httpRequest.queryParams || {}
      try {
        const result = await propertyQuery.deleteById({ id })
  
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