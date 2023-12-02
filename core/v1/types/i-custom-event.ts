import { IEvent } from 'core/v1/types/i-event'

export interface ICustomEvent extends IEvent {
    metadata: Record<string, unknown>
}
