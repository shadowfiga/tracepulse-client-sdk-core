import { IPageView } from 'core/v1/types/i-page-view'
import { ISessionDuration } from 'core/v1/types/i-session-duration'
import { IEvent } from 'core/v1/types/i-event'
import { ICustomEvent } from 'core/v1/types/i-custom-event'
import Fetcher from 'core/utils/fetcher'

export interface ServiceInput {
    apiToken: string
    apiUrl: string
}

export class Service {
    private readonly fetcher: Fetcher

    protected constructor(options: ServiceInput) {
        const { apiToken, apiUrl } = options
        this.fetcher = new Fetcher({
            onPreRequest: (options) => {
                options!.headers = {
                    Authorization: apiToken,
                }
                return options
            },
            baseUrl: apiUrl,
        })
    }

    public static create(options: ServiceInput): Service {
        return new Service(options)
    }

    async trackPageView(pageView: IPageView): Promise<void> {
        await this.fetcher.post(`api/v1/page-view`, pageView)
    }

    async trackSessionDuration(
        sessionDuration: ISessionDuration
    ): Promise<void> {
        await this.fetcher.post(`api/v1/session-duration`, sessionDuration)
    }

    async trackEvent(event: IEvent): Promise<void> {
        await this.fetcher.post(`api/v1/event`, event)
    }

    async trackCustomEvent(customEvent: ICustomEvent): Promise<void> {
        await this.fetcher.post(`api/v1/custom-event`, customEvent)
    }
}
