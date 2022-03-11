export interface ICollection<T> {
  add(element: T): void;
  addRange(elements: T[]): void;
  contains(element: T): boolean;
  containsRange(element: T[]): boolean;
  empty(): void;
  // filter(key: keyof T, value: unknown): T
  find(key: keyof T, value: unknown): T | undefined;
  find(fn: ((value: T) => boolean)): T | undefined;
  isEmpty(): boolean;
  map<V>(fn: (item: T, idx?: number) => V): V[];
  reduce<V>(fn: (prev: V, curr: T, idx?: number) => V, initial: V): V;
  remove(key: T): void;
  remove<V>(key: keyof T, value: V): void;
  remove(key: ((key: T) => boolean)): void;
  size(): number;
  toJSON(): string;
  toArray(): T[];
}
