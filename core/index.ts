import * as V1 from 'core/v1'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import { NotInitializedException } from 'core/exceptions/not-initialized-exception'

let service: V1.Service
export default (args: V1.ServiceInput) => {
    const { apiUrl = '', apiToken = '' } = args
    if (isNil(apiUrl) || isEmpty(apiUrl)) {
        throw new NotInitializedException(
            `Could not initialize TracePulse SDK, the apiUrl parameter is either undefined or null or is empty. Received: ${apiUrl}`
        )
    }

    if (isNil(apiToken) || isEmpty(apiToken)) {
        throw new NotInitializedException(
            `Could not initialize TracePulse SDK, the apiToken parameter is either undefined or null or is empty. Received: ${apiToken}`
        )
    }

    // For this version analytics should be a global singleton
    if (service) {
        return service
    }

    // If there is no existing instance, just return
    service = V1.Service.create(args)
    return service
}
