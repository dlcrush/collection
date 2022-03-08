import { ICollection } from 'contracts/collection';
import Collection from './collection';

describe('Collection', () => {
  describe('add', () => {
    it('adds an element', () => {
      const collection: ICollection<number> = new Collection<number>();
      collection.add(10);
      collection.add(2);

      const result = collection.toArray();

      expect(result).toEqual([10, 2]);
    });

    it('adds a multiple elements', () => {
      const collection = new Collection<number>();

      collection.addRange([2, 10, 15]);
      collection.addRange([1]);

      const result = collection.toArray();

      expect(result).toEqual([2, 10, 15, 1]);
    });
  });

  describe('map', () => {
    it('maps a collection', () => {
      const collection = new Collection<number>();

      collection.addRange([3, 5, 1, 2]);

      const result = collection.map((item) => item + 1);

      expect(result).toEqual([4, 6, 2, 3]);
    });
  });

  describe('reduce', () => {
    it('reduces a collection to a single value', () => {
      const collection = new Collection<number>();

      collection.addRange([2, 7, 10, 3]);

      const result = collection.reduce<number>((prev, curr) => prev + curr, 0);

      expect(result).toEqual(22);
    });
  });

  describe('remove', () => {
    it('removes an element using value', () => {
      const collection = new Collection<number>();
      collection.add(3);
      collection.add(10);
      collection.add(4);

      collection.remove(10);

      const result = collection.toArray();

      expect(result).toEqual([3, 4]);
    });

    it('removes an element using function', () => {
      const collection = new Collection<{ id: string, val: number }>();
      collection.add({ id: 'hello', val: 3 });
      collection.add({ id: 'world', val: 8 });

      collection.remove((itm) => itm.id === 'hello');

      const result = collection.toArray();

      expect(result).toEqual([{ id: 'world', val: 8 }]);
    });

    it('removes an element using key, value', () => {
      const collection = new Collection<{ id: string, val: number }>();
      collection.add({ id: 'hello', val: 3 });
      collection.add({ id: 'world', val: 8 });

      collection.remove('id', 'world');

      const result = collection.toArray();

      expect(result).toEqual([{ id: 'hello', val: 3 }]);
    });
  });
});
