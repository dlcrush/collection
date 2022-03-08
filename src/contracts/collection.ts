export interface ICollection<T> {
  add(element: T): void;
  addRange(elements: T[]): void;
  map<V>(fn: (item: T, idx?: number) => V): V[];
  reduce<V>(fn: (prev: V, curr: T, idx?: number) => V, initial: V): V;
  remove(key: T): void;
  remove<V>(key: keyof T, value: V): void;
  remove(key: ((key: T) => boolean)): void;
  toJSON(): string;
  toArray(): T[];
}
