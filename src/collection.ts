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

  addRange(elements: T[]) {
    this.items.push(...elements);
  }

  static collect<T>(arr?: T[]): ICollection<T> {
    return new Collection<T>(arr);
  }

  empty(): void {
    this.items = [];
  }

  find(key: keyof T, value: unknown): T | undefined;
  find(fn: ((value: T) => boolean)): T | undefined;
  find(...args:unknown[]): T | undefined {
    const predicate = Util.isFunction(args[0]) ? args[0] as (value: T) => boolean
      : ((val: T) => val[args[0] as keyof T] === args[1]);
    return this.items.find((value) => predicate(value));
  }

  isEmpty(): boolean {
    return this.size() < 1;
  }

  map<V>(fn: (item: T, idx?: number) => V): V[] {
    return this.items.map((item, idx) => fn(item, idx));
  }

  reduce<V>(fn: (prev: V, curr: T, idx?: number) => V, initial: V): V {
    return this.items.reduce<V>((prev, curr, idx) => fn(prev, curr, idx), initial);
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

  size(): number {
    return this.items.length;
  }

  toJSON(): string {
    return JSON.stringify(this.items);
  }

  toArray(): T[] {
    return this.items;
  }
}

export default Collection;
