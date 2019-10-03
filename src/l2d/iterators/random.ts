import { MotionIteratorBase } from './base';

export class RandomIterator<T> extends MotionIteratorBase<T> {
  private _pool: number[];
  private _unique: boolean;
  private _counter: number;

  constructor(items: T[], loop: boolean, unique: boolean) {
    super(items, loop);
    this._pool = [];
    this._unique = unique;
    this._counter = 0;
  }

  public next(): IteratorResult<T> {
    // no items
    if (this._items.length === 0) return { done: true, value: null };
    // check counter
    if (!this._loop) {
      this._counter++;
      if (this._counter > this._items.length)
        return { done: true, value: null };
    }
    // random
    return {
      done: false,
      value: this._items[this.getRandomIndex()]
    };
  }

  private getRandomIndex(): number {
    if (!this._unique) return Math.floor(Math.random() * this._items.length);
    if (this._pool.length === 0) this.resetPool();
    return this._pool.pop() as number;
  }

  private resetPool(): void {
    this._pool = Array.from(Array(this._items.length), (_, k) => k);
    for (let i = this._pool.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = this._pool[i];
      this._pool[i] = this._pool[r];
      this._pool[r] = tmp;
    }
  }
}
