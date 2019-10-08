var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { MotionIteratorBase } from './base';
/**
 * Ordered iterator.
 * Returns ordered value in array.
 *
 * @typeparam T Type of array member.
 */
var OrderIterator = /** @class */ (function (_super) {
    __extends(OrderIterator, _super);
    /**
     * Creates an instance of OrderIterator.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     */
    function OrderIterator(items, loop) {
        var _this = _super.call(this, items, loop) || this;
        _this._index = 0;
        return _this;
    }
    /**
     * Iterate array. Implements `Iterator<T>.next`.
     * @return IteratorResult<T> Result of iteration.
     */
    OrderIterator.prototype.next = function () {
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
    };
    return OrderIterator;
}(MotionIteratorBase));
export { OrderIterator };
