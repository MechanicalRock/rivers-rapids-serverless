import * as AWSMock from 'aws-sdk-mock'
import * as AWS from 'aws-sdk'

AWSMock.setSDKInstance(AWS);

import { SnsPublisher } from '../../../src/aws/SnsHandler'
import { expectedEvent } from '../../testEvents';
import { CommonEventBody, FooEvent, EventTypes } from '../../../src/serviceEvents'

describe('sns_handler', () => {

  let snsPublishParams: Partial<AWS.SNS.PublishInput> = {}
  process.env.RAPIDS_TOPIC = '1'

  const sampleEventType = EventTypes.FOO
  const sampleEvent: FooEvent = expectedEvent('journey/01-foo')

  let snsPublisher: SnsPublisher;

  beforeEach(() => {
    snsPublishParams = {}
    AWSMock.mock('SNS', 'publish', function (params: any, callback: Function) {
      snsPublishParams = params
      callback(null, {});
    });
    const mockedSns = new AWS.SNS()
    snsPublisher = new SnsPublisher(mockedSns);
  });

  afterEach(function () {
    AWSMock.restore('SNS', 'publish');
  })

  describe('#publish_event', () => {
    describe('when passed the SNS topic to publish to', () => {

      it('should set the subject to the event type', (done) => {
        const topicArn = 'testTopic'
        snsPublisher.publish_event(sampleEvent, topicArn)
        expect(snsPublishParams.Subject).toEqual(sampleEventType)
        done()

      })

      it('should send the event to the topicArn specified', (done) => {
        const topicArn = 'testTopic'
        snsPublisher.publish_event(sampleEvent, topicArn)
        expect(snsPublishParams.TargetArn).toEqual(topicArn)
        done()
      })

      it('it should pass the eventType as a mandatory message attribute', async (done) => {
        const topicArn = 'testTopic'
        snsPublisher.publish_event(sampleEvent, topicArn)
        expect(snsPublishParams.MessageAttributes).toBeDefined()
        expect(snsPublishParams.MessageAttributes.eventType.StringValue).toEqual(EventTypes.FOO)
        done()

      })
    })

    describe('when optional message attributes are supplied', () => {

      beforeEach(() => {
        const topicArn = 'testTopic'
        snsPublisher.publish_event(sampleEvent, topicArn, {
          foo: 'anAttribute',
          bar: 'anotherAttribute'
        })

      })

      it('it should pass the eventType as a mandatory message attribute', async (done) => {
        expect(snsPublishParams.MessageAttributes).toBeDefined()
        expect(snsPublishParams.MessageAttributes.eventType.StringValue).toEqual(EventTypes.FOO)
        done()

      })

      it('should pass additional message attributes as strings', async (done) => {

        expect(snsPublishParams.MessageAttributes).toBeDefined()
        expect(snsPublishParams.MessageAttributes.foo.DataType).toEqual('String')
        expect(snsPublishParams.MessageAttributes.foo.StringValue).toEqual('anAttribute')

        expect(snsPublishParams.MessageAttributes.bar.DataType).toEqual('String')
        expect(snsPublishParams.MessageAttributes.bar.StringValue).toEqual('anotherAttribute')

        done()

      })

    })

  })

});
