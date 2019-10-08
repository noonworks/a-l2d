"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
/**
 * Random iterator.
 * Returns random value in array.
 *
 * @typeparam T Type of array member.
 */
var RandomIterator = /** @class */ (function (_super) {
    __extends(RandomIterator, _super);
    /**
     * Creates an instance of RandomIterator.
     * @param  {T[]} items Original array.
     * @param  {boolean} loop If true, returns value forever. If false, stop at the length of original array.
     * @param  {boolean} unique If true, it behaves like "box gacha". If false, it returns random value.
     */
    function RandomIterator(items, loop, unique) {
        var _this = _super.call(this, items, loop) || this;
        _this._pool = [];
        _this._unique = unique;
        _this._counter = 0;
        return _this;
    }
    /**
     * Iterate array. Implements `Iterator<T>.next`.
     * @return IteratorResult<T> Result of iteration.
     */
    RandomIterator.prototype.next = function () {
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
    };
    RandomIterator.prototype.getRandomIndex = function () {
        if (!this._unique)
            return Math.floor(Math.random() * this._items.length);
        if (this._pool.length === 0)
            this.resetPool();
        return this._pool.pop();
    };
    RandomIterator.prototype.resetPool = function () {
        this._pool = Array.from(Array(this._items.length), function (_, k) { return k; });
        for (var i = this._pool.length - 1; i > 0; i--) {
            var r = Math.floor(Math.random() * (i + 1));
            var tmp = this._pool[i];
            this._pool[i] = this._pool[r];
            this._pool[r] = tmp;
        }
    };
    return RandomIterator;
}(base_1.MotionIteratorBase));
exports.RandomIterator = RandomIterator;
