import { expectedEvent } from '../testEvents';
import { service } from '../../src/init';

describe('init', () => {
  describe('#service()', () => {
    let actual
    beforeEach(async (done) => {
      actual = await service()
      done()
    })

    it('should return the promise of List<event>', async (done) => {
      expect(actual).toBeInstanceOf(Array)
      done()
    })

    it('should generate init event', () => {
      expect(actual).toContainEqual(expectedEvent('journey/00-init'))
    })

  })
})