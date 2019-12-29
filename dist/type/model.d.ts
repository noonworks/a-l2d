import { Asset } from './asset';
/**
 * Wrapper class of Live2D model.
 */
export declare class Model {
    private _asset;
    private _model;
    private _basicItr;
    private _clickItr;
    /**
     * Live2D model instance.
     */
    get model(): any;
    /**
     * Is  motion finished or not.
     */
    get motionFinished(): boolean;
    private get motionLayer();
    private doMotion;
    /**
     * Play basic motion.
     */
    playBasic(): void;
    /**
     * Play clicked motion.
     */
    playClick(): void;
    /**
     * Creates an instance of Model.
     * @param  {Asset} asset Asset data of the model.
     */
    constructor(asset: Asset);
    private setup;
    private makeMotionIterator;
}
/**
 * Append models to `PIXI.Application.stage`.
 * @param  {Model[]} models [[Model]]s to append.
 * @param  {PIXI.Application} pixiapp PIXI.Application` to append.
 */
export declare function appendModels(models: Model[], pixiapp: PIXI.Application): void;
