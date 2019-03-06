import { CloudEventSpec, build } from './cloudEvents';
import { EventTypes } from './serviceEvents';
import { simpleHandler } from './aws/lambdaHandler' 

export async function handler() {
  return simpleHandler(service)
}

export async function service(): Promise<CloudEventSpec<any>[]> {
  const eventSource = 'io.mechanicalrock.rivers-rapids-serverless/init'
  const init = build({
    eventType: EventTypes.INIT,
    source: eventSource,
    data: {
      message: 'init',
    }
  })
  return [init]
}