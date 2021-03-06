import { CloudEventSpec, build } from './cloudEvents';
import { EventTypes } from './serviceEvents';

import { simpleHandler } from './aws/lambdaHandler' 

export async function handler() {
  return simpleHandler(service)
}

export async function service(): Promise<CloudEventSpec<any>[]> {
  const eventSource = 'io.mechanicalrock.rivers-rapids-serverless/publishEvents'
  const foo = build({
    eventType: EventTypes.FOO,
    source: eventSource,
    data: {
      message: 'foo',
    }
  })
  const bar = build({
    eventType: EventTypes.BAR,
    source: eventSource,
    data: {
      message: 'bar',
    }
  })
  return [foo, bar]
}