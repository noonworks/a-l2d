"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("./iterators/order");
var random_1 = require("./iterators/random");
/**
 * Wrapper class of Live2D model.
 */
var Model = /** @class */ (function () {
    /**
     * Creates an instance of Model.
     * @param  {Asset} asset Asset data of the model.
     */
    function Model(asset) {
        this._asset = asset;
        this._model = this._asset.model;
        // モーションイテレータ
        this._basicItr = this.makeMotionIterator(this._asset.source.motions.basic);
        this._clickItr = this.makeMotionIterator(this._asset.source.motions.click);
        // モデルのセットアップ
        this.setup();
    }
    Object.defineProperty(Model.prototype, "model", {
        /**
         * Live2D model instance.
         */
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "motionFinished", {
        /**
         * Is  motion finished or not.
         */
        get: function () {
            var motion = this._model.animator.getLayer('motion');
            return motion && motion.currentTime >= motion.currentAnimation.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "motionLayer", {
        get: function () {
            return this._model.animator.getLayer('motion');
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.doMotion = function (itr) {
        if (!this.motionLayer)
            return;
        var r = itr.next();
        if (r.done || r.value === null)
            return;
        this.motionLayer.stop();
        this.motionLayer.play(this._asset.motions[r.value]);
    };
    /**
     * Play basic motion.
     */
    Model.prototype.playBasic = function () {
        this.doMotion(this._basicItr);
    };
    /**
     * Play clicked motion.
     */
    Model.prototype.playClick = function () {
        this.doMotion(this._clickItr);
    };
    Model.prototype.setup = function () {
        // キャンバス内のモデルの位置
        this._model.pos_x = this._asset.source.x;
        this._model.pos_y = this._asset.source.y;
        // 基本モーション再生開始
        var override = LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE;
        this._model.animator.addLayer('motion', override, 1);
        this.playBasic();
    };
    Model.prototype.makeMotionIterator = function (opt) {
        var order = opt.order || 'random';
        switch (order) {
            case 'order':
                return new order_1.OrderIterator(opt.values, true);
            case 'unique-random':
                return new random_1.RandomIterator(opt.values, true, true);
            case 'random':
            default:
                return new random_1.RandomIterator(opt.values, true, false);
        }
    };
    return Model;
}());
exports.Model = Model;
/**
 * Append models to `PIXI.Application.stage`.
 * @param  {Model[]} models [[Model]]s to append.
 * @param  {PIXI.Application} pixiapp PIXI.Application` to append.
 */
function appendModels(models, pixiapp) {
    for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
        var mw = models_1[_i];
        pixiapp.stage.addChild(mw.model);
        pixiapp.stage.addChild(mw.model.masks);
    }
    pixiapp.stage.renderable = false;
    pixiapp.ticker.add(function (deltaTime) {
        for (var _i = 0, models_2 = models; _i < models_2.length; _i++) {
            var mw = models_2[_i];
            mw.model.update(deltaTime);
            mw.model.masks.update(pixiapp.renderer);
        }
    });
}
exports.appendModels = appendModels;
