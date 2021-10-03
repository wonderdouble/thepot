import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makeStaff from './staff';

export default function makeStaffEndpointHandler({staffQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postStaff(httpRequest)
      
            case 'GET':
              return getStaff(httpRequest)

            case 'PUT':
                return updateStaff(httpRequest)

            case 'DELETE':
              return  deleteStaff(httpRequest)

            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getStaff (httpRequest) {
      //const { id } = httpRequest.pathParams || {}
      const { id } = httpRequest.queryParams || {}
      const { department } = httpRequest.queryParams || {}
      const { email } = httpRequest.queryParams || {}
      const { max, before, after } = httpRequest.queryParams || {}
  
      if (department !== undefined){
        const result = await staffQuery.findByDepartment({ department })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else if (email !== undefined ){
        const result = await staffQuery.findByEmail({ email })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        } 
  
      }
      else if (id !== undefined ){
        const result = await staffQuery.findById({ id })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else {
        const result = await staffQuery.getStaff({ max, before, after })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
        
      }
        
    }

    async function postStaff(httpRequest) {
        let staffInfo = httpRequest.body
        if (!staffInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            staffInfo = JSON.parse(staffInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const staff = makeStaff(staffInfo)
          const result = await staffQuery.add(staff)
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


    async function updateStaff (httpRequest) {
        let staffInfo = httpRequest.body
        if (!staffInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            staffInfo = JSON.parse(staffInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const staff = makeStaff(staffInfo)
          const result = await staffQuery.update(staff)
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

    async function deleteStaff (httpRequest) {
      const { id } = httpRequest.queryParams || {}
      try {
        const result = await staffQuery.deleteById({ id })
  
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