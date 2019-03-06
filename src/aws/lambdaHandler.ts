import { SnsPublisher, firstMessage } from './SnsHandler';
import { SNS } from 'aws-sdk';
import { SNSEvent } from 'aws-lambda';
import { CloudEventSpec } from '../cloudEvents';

export async function simpleHandler(service: Function) {

  const result = await service()
  return publishResults(result)
}

export async function eventHandler(service: Function, event: SNSEvent) {

  const result = await service(firstMessage(event))
  return publishResults(result)
}

async function publishResults(result: CloudEventSpec<any>[]) {
  const snsPublisher = new SnsPublisher(new SNS()).WithTopic(process.env.RAPIDS_TOPIC)
  await snsPublisher.publish_events(result)
  return Promise.resolve('complete')
}