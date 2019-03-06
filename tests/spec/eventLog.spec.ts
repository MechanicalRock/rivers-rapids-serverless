import { service } from '../../src/eventLog'
import { expectedEvent } from '../testEvents'

describe('eventLog', () => {

  describe('#service', () => {
    const spy: any = {}

    beforeAll(() => {
      spy.console = jest.spyOn(console, 'log').mockImplementation(() => {
        // do nothing
      });
    });

    afterAll(() => {
      spy.console.mockRestore();
    });

    let actual
    beforeEach(async (done) => {
      actual = await service()
      done()
    })

    describe('when passed an event', () => {
      const inputEvent = require('../resources/journey/02-bar.json')
      beforeEach(async (done) => {
        actual = await service(inputEvent)
        done()
      })

      it('should log the details of the event', () => {
        expect(spy.console).toBeCalled()
        expect(spy.console).toBeCalledWith(JSON.stringify({
          message: 'event received',
          detail: inputEvent}))
      })

    })

    it('should return the promise of List<event>', async (done) => {
      expect(actual).toBeInstanceOf(Array)
      done()
    })

    it('should not generate any events', () => {
      expect(actual).toEqual([])
    })
  })
})