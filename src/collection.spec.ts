import { ICollection } from 'contracts/collection';
import Collection from './collection';

interface TestObj {
  id: number;
  val: string;
}

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

  describe('collect', () => {
    it('creates a new collection', () => {
      const collection = Collection.collect([1, 2, 3]);

      expect(collection.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe('contains', () => {
    it('returns true if element is found', () => {
      const collection = Collection.collect([1, 2, 3]);

      expect(collection.contains(2)).toBe(true);
    });

    it('returns false if element is not found', () => {
      const collection = Collection.collect([1, 2, 3]);

      expect(collection.contains(4)).toBe(false);
    });
  });

  describe('containsRange', () => {
    it('returns true if all elements are found', () => {
      const collection = Collection.collect([1, 2, 3]);

      expect(collection.containsRange([1, 3])).toBe(true);
    });

    it('returns false if none of the elements are found', () => {
      const collection = Collection.collect([1, 2, 3]);

      expect(collection.containsRange([4, 6])).toBe(false);
    });

    it('returns false if only some of the elements are found', () => {
      const collection = Collection.collect([1, 2, 3]);

      expect(collection.containsRange([1, 4])).toBe(false);
    });

    it('returns true if empty elements array is passed', () => {
      const collection = Collection.collect([1, 2, 3]);

      expect(collection.containsRange([])).toBe(true);
    });
  });

  describe('empty', () => {
    it('empties out the collection', () => {
      const collection = new Collection<number>([1, 2, 3]);

      collection.empty();

      expect(collection.toArray()).toEqual([]);
    });
  });

  describe('find', () => {
    it('finds an element in a collection using key, value', () => {
      const collection = new Collection<TestObj>();

      collection.addRange([
        { id: 1, val: 'bacon' },
        { id: 2, val: 'lettuce' },
        { id: 3, val: 'tomato' },
      ]);

      const result = collection.find('val', 'bacon');

      expect(result).toStrictEqual({ id: 1, val: 'bacon' });
    });

    it('finds an element in a collection using function', () => {
      const collection = new Collection<TestObj>();

      collection.addRange([
        { id: 1, val: 'bacon' },
        { id: 2, val: 'lettuce' },
        { id: 3, val: 'tomato' },
      ]);

      const result = collection.find((val) => val.id === 2);

      expect(result).toStrictEqual({ id: 2, val: 'lettuce' });
    });

    it('returns undefined if no element is found', () => {
      const collection = new Collection<TestObj>();

      collection.addRange([
        { id: 1, val: 'bacon' },
        { id: 2, val: 'lettuce' },
        { id: 3, val: 'tomato' },
      ]);

      const result = collection.find('id', 5);

      expect(result).toBeUndefined();
    });
  });

  describe('first', () => {
    it('returns the first element when exists', () => {
      const collection = new Collection<number>([1, 2, 3]);

      expect(collection.first()).toBe(1);
    });

    it('returns undefined when collection is empty', () => {
      const collection = new Collection<number>();

      expect(collection.first()).toBeUndefined();
    });
  });

  describe('isEmpty', () => {
    it('returns true when a collection is empty', () => {
      const collection = new Collection<number>();

      expect(collection.isEmpty()).toBe(true);
    });

    it('returns false when a collection is not empty', () => {
      const collection = new Collection<number>([2]);

      expect(collection.isEmpty()).toBe(false);
    });
  });

  describe('last', () => {
    it('returns last element when exists', () => {
      const collection = new Collection<number>([1, 2, 3]);

      expect(collection.last()).toBe(3);
    });

    it('returns undefined when collection is empty', () => {
      const collection = new Collection<number>();

      expect(collection.last()).toBeUndefined();
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

  describe('pluck', () => {
    it('returns an array of values for the key', () => {
      const collection = new Collection<{ id: number, value: number }>();

      collection.addRange([
        { id: 1, value: 10 },
        { id: 2, value: 2 },
        { id: 4, value: 3 },
      ]);

      const result = collection.pluck<number>('value');

      expect(result).toEqual([10, 2, 3]);
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

  describe('size', () => {
    it('returns the size of the collection', () => {
      const collection = new Collection<number>([1, 2, 3, 4]);

      const result = collection.size();

      expect(result).toBe(4);
    });
  });
});
