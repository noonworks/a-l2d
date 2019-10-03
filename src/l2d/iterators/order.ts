import { MotionIteratorBase } from './base';

export class OrderIterator<T> extends MotionIteratorBase<T> {
  private _index: number;

  constructor(items: T[], loop: boolean) {
    super(items, loop);
    this._index = 0;
  }

  public next(): IteratorResult<T> {
    // no items
    if (this._items.length === 0) return { done: true, value: null };
    // over
    if (this._index >= this._items.length) {
      if (!this._loop) return { done: true, value: null };
      this._index = this._index % this._items.length;
    }
    return {
      done: false,
      value: this._items[this._index++]
    };
  }
}
