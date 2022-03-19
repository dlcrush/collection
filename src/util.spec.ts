import Util from './util';

describe('Util', () => {
  describe('isFunction', () => {
    it('returns true when a function is passed', () => {
      expect(Util.isFunction(() => 'hello')).toBe(true);
    });

    it('returns false when function is not passed', () => {
      expect(Util.isFunction(2)).toBe(false);
      expect(Util.isFunction(undefined)).toBe(false);
      expect(Util.isFunction('bacon')).toBe(false);
      expect(Util.isFunction({})).toBe(false);
    });
  });
});
