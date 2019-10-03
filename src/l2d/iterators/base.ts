/**
 * Base class of iterators
 *
 * @typeparam T Type of array member.
 */
export abstract class MotionIteratorBase<T> implements Iterator<T> {
  /**
   * Original items.
   */
  protected _items: T[];
  /**
   * Loop flag.
   */
  protected _loop: boolean;

  /**
   * Length of original array.
   */
  public get length(): number {
    return this._items.length;
  }

  /**
   * The original array.
   */
  public get items(): T[] {
    return this._items;
  }

  /**
   * Creates an instance of MotionIteratorBase.
   * @param  {T[]} items Original array.
   * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
   */
  constructor(items: T[], loop: boolean) {
    this._items = items;
    this._loop = loop;
  }

  /**
   * Iterate array. Implements `Iterator<T>.next`.
   * @return IteratorResult<T> Result of iteration.
   */
  public abstract next(): IteratorResult<T>;
}
