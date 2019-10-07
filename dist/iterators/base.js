/**
 * Base class of iterators
 *
 * @typeparam T Type of array member.
 */
export class MotionIteratorBase {
    /**
     * Creates an instance of MotionIteratorBase.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     */
    constructor(items, loop) {
        this._items = items;
        this._loop = loop;
    }
    /**
     * Length of original array.
     */
    get length() {
        return this._items.length;
    }
    /**
     * The original array.
     */
    get items() {
        return this._items;
    }
}
