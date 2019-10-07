import { MotionIteratorBase } from './base';
/**
 * Random iterator.
 * Returns random value in array.
 *
 * @typeparam T Type of array member.
 */
export class RandomIterator extends MotionIteratorBase {
    /**
     * Creates an instance of RandomIterator.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     * @param  {boolean} unique If true, it behaves like "box gacha". If false, it returns random value.
     */
    constructor(items, loop, unique) {
        super(items, loop);
        this._pool = [];
        this._unique = unique;
        this._counter = 0;
    }
    /**
     * Iterate array. Implements `Iterator<T>.next`.
     * @return IteratorResult<T> Result of iteration.
     */
    next() {
        // no items
        if (this._items.length === 0)
            return { done: true, value: null };
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
    getRandomIndex() {
        if (!this._unique)
            return Math.floor(Math.random() * this._items.length);
        if (this._pool.length === 0)
            this.resetPool();
        return this._pool.pop();
    }
    resetPool() {
        this._pool = Array.from(Array(this._items.length), (_, k) => k);
        for (let i = this._pool.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            const tmp = this._pool[i];
            this._pool[i] = this._pool[r];
            this._pool[r] = tmp;
        }
    }
}
