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
