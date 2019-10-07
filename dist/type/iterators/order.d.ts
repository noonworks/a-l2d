import { MotionIteratorBase } from './base';
/**
 * Ordered iterator.
 * Returns ordered value in array.
 *
 * @typeparam T Type of array member.
 */
export declare class OrderIterator<T> extends MotionIteratorBase<T> {
    private _index;
    /**
     * Creates an instance of OrderIterator.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     */
    constructor(items: T[], loop: boolean);
    /**
     * Iterate array. Implements `Iterator<T>.next`.
     * @return IteratorResult<T> Result of iteration.
     */
    next(): IteratorResult<T>;
}
