"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class of iterators
 *
 * @typeparam T Type of array member.
 */
var MotionIteratorBase = /** @class */ (function () {
    /**
     * Creates an instance of MotionIteratorBase.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     */
    function MotionIteratorBase(items, loop) {
        this._items = items;
        this._loop = loop;
    }
    Object.defineProperty(MotionIteratorBase.prototype, "length", {
        /**
         * Length of original array.
         */
        get: function () {
            return this._items.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MotionIteratorBase.prototype, "items", {
        /**
         * The original array.
         */
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    return MotionIteratorBase;
}());
exports.MotionIteratorBase = MotionIteratorBase;
