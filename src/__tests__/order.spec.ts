import { OrderIterator } from '../l2d/iterators/order';

test('order, loop', () => {
  const arr = [1, 2, 3];
  const itr = new OrderIterator(arr, true);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  for (let i = 0; i < arr.length * 3; i++) {
    const ret = itr.next();
    expect(ret.done).toBe(false);
    expect(typeof ret.value).toBe('number');
    expect(ret.value).toBe(arr[i % arr.length]);
  }
});

test('order, not loop', () => {
  const arr = [1, 2, 3];
  const itr = new OrderIterator(arr, false);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  for (let i = 0; i < arr.length * 3; i++) {
    const ret = itr.next();
    if (i < arr.length) {
      expect(ret.done).toBe(false);
      expect(typeof ret.value).toBe('number');
      expect(ret.value).toBe(arr[i]);
    } else {
      expect(ret.done).toBe(true);
      expect(ret.value).toBeNull();
    }
  }
});

test('order, zero length', () => {
  const arr: number[] = [];
  const itr = new OrderIterator(arr, true);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  for (let i = 0; i < 6; i++) {
    const ret = itr.next();
    expect(ret.done).toBe(true);
    expect(ret.value).toBeNull();
  }
});
