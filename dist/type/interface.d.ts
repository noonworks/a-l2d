/**
 * Type of the order of motion.
 *
 * - `order`: According to the order of the array.
 * - `random`: Random.
 * - `unique-random`: Like "box-gacha".
 */
export declare type MotionOrderTypes = 'order' | 'random' | 'unique-random';
/**
 * Motion setting of the model.
 */
export interface Motion {
    /**
     * Type of the order of motion.
     *
     * - `order`: According to the order of the array.
     * - `random`: Random.
     * - `unique-random`: Like "box-gacha".
     */
    order: MotionOrderTypes;
    /**
     * Names of the motion assets. It refers to `assets` name in [[AssetModel]].
     */
    values: string[];
}
/**
 * [[Motion]] settings of the model.
 */
export interface MotionSetting {
    /**
     * Basic [[Motion]] setting of the model.
     */
    basic: Motion;
    /**
     * Click [[Motion]] setting of the model.
     */
    click: Motion;
}
/**
 * Asset data of a model.
 */
export interface AssetModel {
    /**
     * Identifer of the model.
     *
     * It intended for debugging. You can give it any string.
     */
    id: string;
    /**
     * X position of the model in the component.
     */
    x: number;
    /**
     * Y position of the model in the component.
     */
    y: number;
    /**
     * Urls of the model.
     *
     * It contains both of model data and motions.
     */
    assets: {
        model3: string;
        [assetname: string]: string;
    };
    /**
     * [[MotionSetting]]s of the model.
     */
    motions: MotionSetting;
}
/**
 * Asset data of models.
 *
 * A component can contain multiple [[AssetModel]]s.
 */
export interface AssetModels {
    /**
     * [[AssetModel]]s to append to a component.
     */
    models: AssetModel[];
}
