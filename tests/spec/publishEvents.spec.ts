import { service } from '../../src/publishEvents'
import { expectedEvent } from '../testEvents'

describe('publishEvents', () => {
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

    it('should generate foo and bar events', () => {
      expect(actual).toContainEqual(expectedEvent('journey/01-foo'))
      expect(actual).toContainEqual(expectedEvent('journey/02-bar'))
    })
  })
})