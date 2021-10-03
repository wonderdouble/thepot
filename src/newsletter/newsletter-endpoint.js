import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makeNewsletter from './newsletter';

export default function makeNewsletterEndpointHandler({newsletterQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postNewsletter(httpRequest)
      
            case 'GET':
              return getNewsletter(httpRequest)

            case 'DELETE':
              return  deleteNewsletter(httpRequest)
            
            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getNewsletter (httpRequest) {
        const { id } = httpRequest.pathParams || {}
        const { max, before, after } = httpRequest.queryParams || {}
    
        const result = id
            ? await newsletterQuery.findById({ newsletterId: id })
            : await newsletterQuery.getNewsletter({ max, before, after })
        
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
    }

    async function postNewsletter (httpRequest) {
        let newsletterInfo = httpRequest.body
        if (!newsletterInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            newsletterInfo = JSON.parse(newsletterInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const newsletter = makeNewsletter(newsletterInfo)
          const result = await newsletterQuery.add(newsletter)
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


    async function deleteNewsletter (httpRequest) {
      //const { customer_id } = httpRequest.pathParams || {}
      const { id } = httpRequest.queryParams || {}
      try {
        const result = await newsletterQuery.deleteById({ id })
  
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