export abstract class MotionIteratorBase<T> implements Iterator<T> {
  protected _items: T[];
  protected _loop: boolean;

  public get length(): number {
    return this._items.length;
  }

  public get items(): T[] {
    return this._items;
  }

  constructor(items: T[], loop: boolean) {
    this._items = items;
    this._loop = loop;
  }

  public abstract next(): IteratorResult<T>;
}
