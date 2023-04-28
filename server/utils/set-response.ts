import { H3Event } from 'h3'
import { ISetResponse } from '~/types'

const setResponse = (event: H3Event, responseData: ISetResponse) => {
    event.node.res.statusCode = responseData.statusCode
    event.node.res.statusMessage = responseData.statusMessage
    if (responseData.data === undefined) {
        return {
            statusCode: event.node.res.statusCode,
            statusMessage: event.node.res.statusMessage,
            cause: responseData.cause
        }
    } else if (responseData.cause === undefined) {
        return {
            statusCode: event.node.res.statusCode,
            statusMessage: event.node.res.statusMessage,
            data: responseData.data
        }
    } else if (responseData.cause === undefined && responseData.data === undefined) {
        return {
            statusCode: event.node.res.statusCode,
            statusMessage: event.node.res.statusMessage
        }
    } else {
        return {
            statusCode: event.node.res.statusCode,
            statusMessage: event.node.res.statusMessage,
            data: responseData.data,
            cause: responseData.cause
        }
    }
}

export default setResponse
