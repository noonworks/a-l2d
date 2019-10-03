import { Loader, LoaderResource, ILoaderOptions } from 'pixi.js';
import { AssetModels, AssetModel } from './interface';

declare const LIVE2DCUBISMPIXI: any;
declare const LIVE2DCUBISMFRAMEWORK: any;

const MODEL_KEY = 'model3';
const MOTION_KEY_PREFIX = 'motion';

type LoadedResources = {
  [name: string]: Partial<LoaderResource>;
};

type LoaderCallback = (
  loader: Loader,
  resources: Partial<LoadedResources>
) => void;

type LoaderRequest = {
  name: string;
  url: string;
};

enum XHR_RESPONSE_TYPE {
  JSON = 'json'
}
const LOADER_OPT: ILoaderOptions = {
  xhrType: XHR_RESPONSE_TYPE.JSON
};

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
export class AssetLoader {
  /**
   * Load assets of models.
   * @param  {string} src URL of asset JSON. See [[AssetModels]].
   */
  public load(src: string): Promise<Asset[]> {
    return new Promise<Asset[]>(
      (
        resolve: (assets: Asset[]) => void,
        reject: (reason: Error) => void
      ): void => {
        this.pixiLoad(
          [{ name: 'src', url: src }],
          (_: Loader, resources: Partial<LoadedResources>) => {
            const res = this.getResult(resources, 'src', reject);
            if (!res) return;
            const data = res.data as AssetModels;
            if (!data) {
              reject(new Error('Could not parse src [' + src + '].'));
              return;
            }
            Promise.all(data.models.map(am => this.loadModel(am, src)))
              .then(resolve)
              .catch(reject);
          },
          reject
        );
      }
    );
  }

  private pixiLoad(
    req: LoaderRequest[],
    cb: LoaderCallback,
    reject: (reason: Error) => void
  ): void {
    const loader = new PIXI.Loader();
    for (const r of req) loader.add(r.name, r.url, LOADER_OPT);
    loader.load((loader: Loader, resources: Partial<LoadedResources>) => {
      try {
        cb(loader, resources);
      } catch (error) {
        reject(error);
      }
    });
  }

  private getResult(
    resources: Partial<LoadedResources>,
    name: string,
    reject: (reason: Error) => void
  ): Partial<LoaderResource> | null {
    const res = resources[name];
    if (!res) {
      reject(new Error('Could not load [' + name + '].'));
      return null;
    }
    if (res.error) {
      reject(res.error);
      return null;
    }
    return res;
  }

  private loadModel(assetmodel: AssetModel, url: string): Promise<Asset> {
    return new Promise<Asset>(
      (
        resolve: (asset: Asset) => void,
        reject: (reason: Error) => void
      ): void => {
        if (!assetmodel.assets) {
          reject(
            new Error('Could not load assets. [assets] not found in JSON.')
          );
          return;
        }
        try {
          const req = Object.keys(assetmodel.assets).map(key => {
            return { name: key, url: assetmodel.assets[key] };
          });
          this.pixiLoad(
            req,
            (loader: Loader, resources: Partial<LoadedResources>) => {
              // motions
              const animation = LIVE2DCUBISMFRAMEWORK.Animation;
              const motions = Object.keys(resources)
                .filter(k => k.startsWith(MOTION_KEY_PREFIX))
                .reduce((obj: Motions, key) => {
                  const res = resources[key];
                  if (res) obj[key] = animation.fromMotion3Json(res.data);
                  return obj;
                }, {});
              // model
              const builder = new LIVE2DCUBISMPIXI.ModelBuilder();
              builder.buildFromModel3Json(
                loader,
                resources[MODEL_KEY],
                (model: any) => {
                  if (model == null) {
                    reject(new Error('model not found.'));
                    return;
                  }
                  try {
                    resolve({ model, motions, source: assetmodel, url });
                  } catch (error) {
                    reject(error);
                  }
                }
              );
            },
            reject
          );
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}
