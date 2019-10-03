import { Asset } from './asset';
import { MotionOrderTypes, Motion } from './interface';
import { OrderIterator } from './iterators/order';
import { RandomIterator } from './iterators/random';
import { MotionIteratorBase } from './iterators/base';

declare const LIVE2DCUBISMFRAMEWORK: any;

/**
 * Wrapper class of Live2D model.
 */
export class Model {
  private _asset: Asset;
  private _model: any;
  private _basicItr: MotionIteratorBase<string>;
  private _clickItr: MotionIteratorBase<string>;

  /**
   * Live2D model instance.
   */
  public get model(): any {
    return this._model;
  }

  /**
   * Is  motion finished or not.
   */
  public get motionFinished(): boolean {
    const motion = this._model.animator.getLayer('motion');
    return motion && motion.currentTime >= motion.currentAnimation.duration;
  }

  private get motionLayer(): any {
    return this._model.animator.getLayer('motion');
  }

  private doMotion(itr: MotionIteratorBase<string>): void {
    if (!this.motionLayer) return;
    const r = itr.next();
    if (r.done || r.value === null) return;
    this.motionLayer.stop();
    this.motionLayer.play(this._asset.motions[r.value]);
  }

  /**
   * Play basic motion.
   */
  public playBasic(): void {
    this.doMotion(this._basicItr);
  }

  /**
   * Play clicked motion.
   */
  public playClick(): void {
    this.doMotion(this._clickItr);
  }

  /**
   * Creates an instance of Model.
   * @param  {Asset} asset Asset data of the model.
   */
  constructor(asset: Asset) {
    this._asset = asset;
    this._model = this._asset.model;
    // モーションイテレータ
    this._basicItr = this.makeMotionIterator(this._asset.source.motions.basic);
    this._clickItr = this.makeMotionIterator(this._asset.source.motions.click);
    // モデルのセットアップ
    this.setup();
  }

  private setup(): void {
    // キャンバス内のモデルの位置
    this._model.pos_x = this._asset.source.x;
    this._model.pos_y = this._asset.source.y;
    // 基本モーション再生開始
    const override = LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE;
    this._model.animator.addLayer('motion', override, 1);
    this.playBasic();
  }

  private makeMotionIterator(opt: Motion): MotionIteratorBase<string> {
    const order: MotionOrderTypes = opt.order || 'random';
    switch (order) {
      case 'order':
        return new OrderIterator<any>(opt.values, true);
      case 'unique-random':
        return new RandomIterator<any>(opt.values, true, true);
      case 'random':
      default:
        return new RandomIterator<any>(opt.values, true, false);
    }
  }
}

/**
 * Append models to `PIXI.Application.stage`.
 * @param  {Model[]} models [[Model]]s to append.
 * @param  {PIXI.Application} pixiapp PIXI.Application` to append.
 */
export function appendModels(models: Model[], pixiapp: PIXI.Application): void {
  for (const mw of models) {
    pixiapp.stage.addChild(mw.model);
    pixiapp.stage.addChild(mw.model.masks);
  }
  pixiapp.stage.renderable = false;
  pixiapp.ticker.add((deltaTime: any) => {
    for (const mw of models) {
      mw.model.update(deltaTime);
      mw.model.masks.update(pixiapp.renderer);
    }
  });
}
