import { CloudEventSpec } from '../src/cloudEvents';
import { join, dirname } from 'path';
import merge from 'lodash.merge'

export function expectedEvent<T, U extends CloudEventSpec<T>>(eventFileName: string, overrides?: Partial<CloudEventSpec<T>>): U {
  const pathToEventFile = join(dirname(__dirname), 'tests', 'resources', `${eventFileName}.json`)
  const event = require(pathToEventFile)
  // see - https://stackoverflow.com/a/3143231
  const isoDateFormatRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
  event.eventTime = expect.stringMatching(isoDateFormatRegex)
  const uuidFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  event.eventID = expect.stringMatching(uuidFormat)
  return merge({}, event, overrides)
}
