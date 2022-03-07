export interface ICollection<T> {
  add(element: T): void;
  remove(key: T): void;
  remove<V>(key: keyof T, value: V): void;
  remove(key: ((key: T) => boolean)): void;
  toJSON(): string;
  toArray(): T[];
}
