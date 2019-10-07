import { OrderIterator } from './iterators/order';
import { RandomIterator } from './iterators/random';
/**
 * Wrapper class of Live2D model.
 */
export class Model {
    /**
     * Creates an instance of Model.
     * @param  {Asset} asset Asset data of the model.
     */
    constructor(asset) {
        this._asset = asset;
        this._model = this._asset.model;
        // モーションイテレータ
        this._basicItr = this.makeMotionIterator(this._asset.source.motions.basic);
        this._clickItr = this.makeMotionIterator(this._asset.source.motions.click);
        // モデルのセットアップ
        this.setup();
    }
    /**
     * Live2D model instance.
     */
    get model() {
        return this._model;
    }
    /**
     * Is  motion finished or not.
     */
    get motionFinished() {
        const motion = this._model.animator.getLayer('motion');
        return motion && motion.currentTime >= motion.currentAnimation.duration;
    }
    get motionLayer() {
        return this._model.animator.getLayer('motion');
    }
    doMotion(itr) {
        if (!this.motionLayer)
            return;
        const r = itr.next();
        if (r.done || r.value === null)
            return;
        this.motionLayer.stop();
        this.motionLayer.play(this._asset.motions[r.value]);
    }
    /**
     * Play basic motion.
     */
    playBasic() {
        this.doMotion(this._basicItr);
    }
    /**
     * Play clicked motion.
     */
    playClick() {
        this.doMotion(this._clickItr);
    }
    setup() {
        // キャンバス内のモデルの位置
        this._model.pos_x = this._asset.source.x;
        this._model.pos_y = this._asset.source.y;
        // 基本モーション再生開始
        const override = LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE;
        this._model.animator.addLayer('motion', override, 1);
        this.playBasic();
    }
    makeMotionIterator(opt) {
        const order = opt.order || 'random';
        switch (order) {
            case 'order':
                return new OrderIterator(opt.values, true);
            case 'unique-random':
                return new RandomIterator(opt.values, true, true);
            case 'random':
            default:
                return new RandomIterator(opt.values, true, false);
        }
    }
}
/**
 * Append models to `PIXI.Application.stage`.
 * @param  {Model[]} models [[Model]]s to append.
 * @param  {PIXI.Application} pixiapp PIXI.Application` to append.
 */
export function appendModels(models, pixiapp) {
    for (const mw of models) {
        pixiapp.stage.addChild(mw.model);
        pixiapp.stage.addChild(mw.model.masks);
    }
    pixiapp.stage.renderable = false;
    pixiapp.ticker.add((deltaTime) => {
        for (const mw of models) {
            mw.model.update(deltaTime);
            mw.model.masks.update(pixiapp.renderer);
        }
    });
}
