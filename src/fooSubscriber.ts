import { CloudEventSpec, build } from './cloudEvents';
import { EventTypes } from './serviceEvents';

import { simpleHandler } from './aws/lambdaHandler' 

export async function handler() {
  return simpleHandler(service)
}

export async function service(): Promise<CloudEventSpec<any>[]> {
  const eventSource = 'io.mechanicalrock.rivers-rapids-serverless/fooSubscriber'
  const baz = build({
    eventType: EventTypes.BAZ,
    source: eventSource,
    data: {
      message: 'baz',
    }
  })
  return [baz]
}