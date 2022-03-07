class Util {
  static isFunction(fn: unknown) {
    return typeof fn === 'function';
  }

  static isString(val: unknown) {
    return typeof val === 'string';
  }

  static isObject(val: unknown) {
    return typeof val === 'object' && !Array.isArray(val) && val !== null;
  }
}

export default Util;
