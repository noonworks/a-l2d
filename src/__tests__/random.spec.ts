import { RandomIterator } from '../l2d/iterators/random';

test('random, loop, not unique', () => {
  const arr = [1, 2, 3];
  const itr = new RandomIterator(arr, true, false);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  for (let i = 0; i < arr.length * 3; i++) {
    const ret = itr.next();
    expect(ret.done).toBe(false);
    expect(typeof ret.value).toBe('number');
    expect(ret.value >= 1 && ret.value <= 3).toBe(true);
  }
});

test('random, not loop, not unique', () => {
  const arr = [1, 2, 3];
  const itr = new RandomIterator(arr, false, false);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  for (let i = 0; i < arr.length * 3; i++) {
    const ret = itr.next();
    if (i < arr.length) {
      expect(ret.done).toBe(false);
      expect(typeof ret.value).toBe('number');
      expect(ret.value >= 1 && ret.value <= 3).toBe(true);
    } else {
      expect(ret.done).toBe(true);
      expect(ret.value).toBeNull();
    }
  }
});

test('random, loop, unique', () => {
  const arr = [1, 2, 3];
  const itr = new RandomIterator(arr, true, true);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  const pool: number[] = [];
  for (let i = 0; i < arr.length * 3; i++) {
    const ret = itr.next();
    expect(ret.done).toBe(false);
    expect(typeof ret.value).toBe('number');
    expect(ret.value >= 1 && ret.value <= 3).toBe(true);
    if (typeof ret.value != 'number') break;
    pool.push(ret.value);
    if (i % arr.length == arr.length - 1) {
      expect(pool.sort()).toEqual(arr);
      pool.length = 0;
    }
  }
});

test('random, not loop, unique', () => {
  const arr = [1, 2, 3];
  const itr = new RandomIterator(arr, false, true);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  const pool: number[] = [];
  for (let i = 0; i < arr.length * 3; i++) {
    const ret = itr.next();
    if (i < arr.length) {
      expect(ret.done).toBe(false);
      expect(typeof ret.value).toBe('number');
      expect(ret.value >= 1 && ret.value <= 3).toBe(true);
      if (typeof ret.value != 'number') break;
      pool.push(ret.value);
      if (i % arr.length == arr.length - 1) {
        expect(pool.sort()).toEqual(arr);
        pool.length = 0;
      }
    } else {
      expect(ret.done).toBe(true);
      expect(ret.value).toBeNull();
    }
  }
});

test('random, zero length', () => {
  const arr: number[] = [];
  const itr = new RandomIterator(arr, true, true);
  expect(itr.length).toBe(arr.length);
  expect(itr.items).toEqual(arr);
  for (let i = 0; i < 6; i++) {
    const ret = itr.next();
    expect(ret.done).toBe(true);
    expect(ret.value).toBeNull();
  }
});
