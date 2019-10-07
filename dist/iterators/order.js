import { MotionIteratorBase } from './base';
/**
 * Ordered iterator.
 * Returns ordered value in array.
 *
 * @typeparam T Type of array member.
 */
export class OrderIterator extends MotionIteratorBase {
    /**
     * Creates an instance of OrderIterator.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     */
    constructor(items, loop) {
        super(items, loop);
        this._index = 0;
    }
    /**
     * Iterate array. Implements `Iterator<T>.next`.
     * @return IteratorResult<T> Result of iteration.
     */
    next() {
        // no items
        if (this._items.length === 0)
            return { done: true, value: null };
        // over
        if (this._index >= this._items.length) {
            if (!this._loop)
                return { done: true, value: null };
            this._index = this._index % this._items.length;
        }
        return {
            done: false,
            value: this._items[this._index++]
        };
    }
}
