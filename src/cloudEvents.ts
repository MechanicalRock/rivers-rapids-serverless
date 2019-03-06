import uuid from 'uuid/v4';

export interface CloudEventSpec<T extends Object> {
    cloudEventsVersion: string,
    eventType: string,
    eventTypeVersion: string,
    source: string,
    eventID: string,
    eventTime: string,
    contentType: string,
    data: T
}

export const build = (eventProps: EventProps): CloudEventSpec<Object> => {
    return {
        cloudEventsVersion: '0.1',
        eventType: eventProps.eventType,
        eventTypeVersion: eventProps.eventTypeVersion || '1.0',
        source: eventProps.source,
        eventID: uuid(),
        eventTime: new Date().toISOString(),
        contentType: 'application/json',
        data: eventProps.data
    }
}

export interface EventProps {
    eventType: string
    eventTypeVersion?: string
    source: string
    data: object
}
