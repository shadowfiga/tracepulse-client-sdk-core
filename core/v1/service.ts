import { IPageView } from 'core/v1/types/i-page-view'
import { ISessionDuration } from 'core/v1/types/i-session-duration'
import { IEvent } from 'core/v1/types/i-event'
import { ICustomEvent } from 'core/v1/types/i-custom-event'

export interface ServiceInput {
    apiToken: string
    apiUrl: string
}

export class Service {
    private readonly apiToken: string
    private readonly apiUrl: string

    protected constructor(options: ServiceInput) {
        const { apiToken, apiUrl } = options
        this.apiToken = apiToken
        this.apiUrl = apiUrl
    }

    public static create(options: ServiceInput): Service {
        return new Service(options)
    }

    async trackPageView(pageView: IPageView): Promise<void> {
        throw new Error(`Not implemented, ${pageView}`)
    }

    async trackSessionDuration(
        sessionDuration: ISessionDuration
    ): Promise<void> {
        throw new Error(`Not implemented, ${sessionDuration}`)
    }

    async trackEvent(event: IEvent): Promise<void> {
        throw new Error(`Not implemented, ${event}`)
    }

    async trackCustomEvent(customEvent: ICustomEvent): Promise<void> {
        throw new Error(`Not implemented, ${customEvent}`)
    }
}
