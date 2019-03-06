import { service } from '../../src/fooSubscriber'
import { expectedEvent } from '../testEvents'

describe('fooSubscriber', () => {
  describe('#service', () => {
    let actual
    beforeEach( async (done) => {
      actual = await service()
      done()
    })

    it('should return the promise of List<event>', async (done) => {
      expect(actual).toBeInstanceOf(Array)
      done()
    })

    it('should generate baz events', () => {
      expect(actual).toContainEqual(expectedEvent('journey/03-baz'))
    })
  })
})