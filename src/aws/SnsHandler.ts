import { SNS } from 'aws-sdk';
import { SNSEvent } from 'aws-lambda';
import { CloudEventSpec } from '../cloudEvents'

type StringMessageAttributes = { [key: string]: string }

export interface Publisher {
    publish_event(event: CloudEventSpec<Object>, optionalMessageAttributes: StringMessageAttributes): Promise<any>
    publish_events(event: CloudEventSpec<Object>[]): Promise<any>
}

class SnsPublisherWithTopic {
    constructor(private snsPublisher: SnsPublisher, private topicArn: string) {}

    async publish_event(event: CloudEventSpec<Object>, optionalMessageAttributes: StringMessageAttributes = {}) {
        return await this.snsPublisher.publish_event(event, this.topicArn, optionalMessageAttributes);
    }

    async publish_events(events: CloudEventSpec<Object>[]) {
        return await this.snsPublisher.publish_events(events, this.topicArn);
    }
}

export class SnsPublisher {
    private sns;

    constructor(sns?: AWS.SNS) {
        this.sns = sns || new SNS();
    }

    WithTopic(topicArn: string): SnsPublisherWithTopic {
        return new SnsPublisherWithTopic(this, topicArn)
    }

    async publish_event(event: CloudEventSpec<Object>, topicArn: string, optionalMessageAttributes: StringMessageAttributes = {}) {

        const attributesToApply = Object.keys(optionalMessageAttributes).map(key => {
            return {
                [key]: {
                    DataType: 'String',
                    StringValue: optionalMessageAttributes[key]
                }
            }
        })

        const messageAttributes: SNS.MessageAttributeMap = Object.assign({}, ...attributesToApply, {
            eventType: {
                DataType: 'String',
                StringValue: event.eventType
            }
        })

        const params: SNS.PublishInput = {
            Message: JSON.stringify(event),
            Subject: event.eventType,
            TargetArn: topicArn,
            MessageAttributes: messageAttributes
        };

        return await this.sns.publish(params).promise();

    }

    async publish_events(events: CloudEventSpec<Object>[], topicArn: string) {
        const publishPromises = events.map(event => this.publish_event(event, topicArn));
        await Promise.all(publishPromises);
    }

}

export function firstMessage(event: SNSEvent) {
    if (event.Records.length > 1) {
        const failure = `Only one SNS event is supported: ${JSON.stringify(event, null, 2)}`
        console.log(failure)
        throw new Error(failure)
    }

    return eventMessage(event.Records[0])
}

// Extract the event from an SNS record
export const eventMessage = (snsRecord) => {
    console.log(snsRecord.Sns.Message)
    return JSON.parse(snsRecord.Sns.Message)
}

export const snsTopicArn = (event) => {
    return event.Records[0].Sns.TopicArn
}
