import { AssetModel } from './interface';
interface Motions {
    [name: string]: any;
}
/**
 * @ignore
 * Asset data interface.
 */
export interface Asset {
    url: string;
    source: AssetModel;
    model: any;
    motions: Motions;
}
/**
 * Helper class to load asset.
 */
export declare class AssetLoader {
    /**
     * Load assets of models.
     * @param  {string} src URL of asset JSON. See [[AssetModels]].
     */
    load(src: string): Promise<Asset[]>;
    private pixiLoad;
    private getResult;
    private loadModel;
}
export {};
