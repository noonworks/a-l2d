import { MotionIteratorBase } from './base';
/**
 * Random iterator.
 * Returns random value in array.
 *
 * @typeparam T Type of array member.
 */
export declare class RandomIterator<T> extends MotionIteratorBase<T> {
    private _pool;
    private _unique;
    private _counter;
    /**
     * Creates an instance of RandomIterator.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     * @param  {boolean} unique If true, it behaves like "box gacha". If false, it returns random value.
     */
    constructor(items: T[], loop: boolean, unique: boolean);
    /**
     * Iterate array. Implements `Iterator<T>.next`.
     * @return IteratorResult<T> Result of iteration.
     */
    next(): IteratorResult<T>;
    private getRandomIndex;
    private resetPool;
}
