import { CloudEventSpec, build } from './cloudEvents';

import { eventHandler } from './aws/lambdaHandler' 
import { SNSEvent } from 'aws-lambda';

export async function handler(event: SNSEvent) {
  return eventHandler(service, event)
}

export async function service(event?: CloudEventSpec<any>): Promise<CloudEventSpec<any>[]> {
  console.log(JSON.stringify({
    message: 'event received',
    detail: event
  }))
  return []
}