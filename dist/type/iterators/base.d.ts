/**
 * Base class of iterators
 *
 * @typeparam T Type of array member.
 */
export declare abstract class MotionIteratorBase<T> implements Iterator<T> {
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
    get length(): number;
    /**
     * The original array.
     */
    get items(): T[];
    /**
     * Creates an instance of MotionIteratorBase.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     */
    constructor(items: T[], loop: boolean);
    /**
     * Iterate array. Implements `Iterator<T>.next`.
     * @return IteratorResult<T> Result of iteration.
     */
    abstract next(): IteratorResult<T>;
}
