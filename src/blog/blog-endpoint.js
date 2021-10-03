import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../helpers/errors';
  import makeHttpError from '../helpers/http-error';
  import makeBlog from './blog';

export default function makeBlogEndpointHandler({blogQuery}){
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
              return postBlog(httpRequest)
      
            case 'GET':
              return getBlog(httpRequest)

            case 'PUT':
              return updateBlog(httpRequest)

            case 'DELETE':
              return deleteBlog(httpRequest)
      
            default:
              return makeHttpError({
                statusCode: 405,
                errorMessage: `${httpRequest.method} method not allowed.`
              })
        }
    }

    async function getBlog (httpRequest) {
      const { id } = httpRequest.queryParams || {}
      const { min } = httpRequest.queryParams || {} 
      const { topic } = httpRequest.queryParams || {} 
      const { author } = httpRequest.queryParams || {}
      const { date } = httpRequest.queryParams || {}
      const { max, before, after } = httpRequest.queryParams || {}
  
      if (min !== undefined){
        const result = await blogQuery.findByMin({ min })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else if (topic !== undefined){
        const result = await blogQuery.findByTopic({ topic })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else if (author !== undefined ){
        const result = await blogQuery.findByAuthor({ author})
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        } 
  
      }
      else if (date !== undefined ){
        const result = await blogQuery.findByDate({ date})
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        } 
  
      }
      else if (id !== undefined ){
        const result = await blogQuery.findById({ id })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
  
      }
      else {
        const result = await blogQuery.getBlog({ max, before, after })
  
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(result)
        }
        
      }
        
    }

    async function postBlog (httpRequest) {
        let blogInfo = httpRequest.body
        if (!blogInfo) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. No POST body.'
          })
        }
    
        if (typeof httpRequest.body === 'string') {
          try {
            blogInfo = JSON.parse(blogInfo)
          } catch {
            return makeHttpError({
              statusCode: 400,
              errorMessage: 'Bad request. POST body must be valid JSON.'
            })
          }
        }
    
        try {
          const blog = makeBlog(blogInfo)
          const result = await blogQuery.add(blog)
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

    async function updateBlog (httpRequest) {
    
      let blogInfo = httpRequest.body
      
      if (!blogInfo) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. No POST body.'
        })
      }
  
      if (typeof httpRequest.body === 'string') {
        try {
          blogInfo = JSON.parse(blogInfo)
        } catch {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. POST body must be valid JSON.'
          })
        }
      }
  
      try {
        const blog = makeBlog(blogInfo);
        const result = await blogQuery.update(blog)
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
  
    async function deleteBlog (httpRequest) {
      const { id } = httpRequest.queryParams || {}
  
      try {
        const result = await blogQuery.deleteById({ id })
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