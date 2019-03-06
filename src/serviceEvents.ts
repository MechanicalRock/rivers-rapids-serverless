import { CloudEventSpec } from './cloudEvents';

export enum EventTypes {
  INIT = 'io.mechanicalrock.rivers-rapids-serverless.init',
  FOO = 'io.mechanicalrock.rivers-rapids-serverless.foo',
  BAR = 'io.mechanicalrock.rivers-rapids-serverless.bar',
  BAZ = 'io.mechanicalrock.rivers-rapids-serverless.baz',
}
export interface FooEvent extends CloudEventSpec<CommonEventBody> {
  eventType: EventTypes.FOO
}

export interface BarEvent extends CloudEventSpec<CommonEventBody> {
  eventType: EventTypes.BAR
}

export interface BazEvent extends CloudEventSpec<CommonEventBody> {
  eventType: EventTypes.BAZ
}

export interface CommonEventBody {
  message: string
}