import { ICollection } from 'contracts/collection';
import Util from './util';

class Collection<T> implements ICollection<T> {
  protected items: T[];

  constructor(arr?: T[]) {
    this.items = arr || [];
  }

  add(element: T) {
    this.items.push(element);
  }

  remove(key: T): void;
  remove(key: ((key: T) => boolean)): void;
  remove<V>(key: keyof T, value: V): void;
  remove(...args: unknown[]) {
    const key = args[0];
    if (args.length > 1) {
      const value = args[1];
      this.items = this.items.filter((x) => x[key as keyof T] !== value);
    }
    if (Util.isFunction(key)) {
      const fn = key as ((key: T) => boolean);
      this.items = this.items.filter((itm) => !fn(itm));
    } else {
      this.items = this.items.filter((x) => x !== key);
    }
  }

  toJSON(): string {
    return JSON.stringify(this.items);
  }

  toArray(): T[] {
    return this.items;
  }
}

export default Collection;