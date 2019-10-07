const MODEL_KEY = 'model3';
const MOTION_KEY_PREFIX = 'motion';
var XHR_RESPONSE_TYPE;
(function (XHR_RESPONSE_TYPE) {
    XHR_RESPONSE_TYPE["JSON"] = "json";
})(XHR_RESPONSE_TYPE || (XHR_RESPONSE_TYPE = {}));
const LOADER_OPT = {
    xhrType: XHR_RESPONSE_TYPE.JSON
};
/**
 * Helper class to load asset.
 */
export class AssetLoader {
    /**
     * Load assets of models.
     * @param  {string} src URL of asset JSON. See [[AssetModels]].
     */
    load(src) {
        return new Promise((resolve, reject) => {
            this.pixiLoad([{ name: 'src', url: src }], (_, resources) => {
                const res = this.getResult(resources, 'src', reject);
                if (!res)
                    return;
                const data = res.data;
                if (!data) {
                    reject(new Error('Could not parse src [' + src + '].'));
                    return;
                }
                Promise.all(data.models.map(am => this.loadModel(am, src)))
                    .then(resolve)
                    .catch(reject);
            }, reject);
        });
    }
    pixiLoad(req, cb, reject) {
        const loader = new PIXI.Loader();
        for (const r of req)
            loader.add(r.name, r.url, LOADER_OPT);
        loader.load((loader, resources) => {
            try {
                cb(loader, resources);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getResult(resources, name, reject) {
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
    loadModel(assetmodel, url) {
        return new Promise((resolve, reject) => {
            if (!assetmodel.assets) {
                reject(new Error('Could not load assets. [assets] not found in JSON.'));
                return;
            }
            try {
                const req = Object.keys(assetmodel.assets).map(key => {
                    return { name: key, url: assetmodel.assets[key] };
                });
                this.pixiLoad(req, (loader, resources) => {
                    // motions
                    const animation = LIVE2DCUBISMFRAMEWORK.Animation;
                    const motions = Object.keys(resources)
                        .filter(k => k.startsWith(MOTION_KEY_PREFIX))
                        .reduce((obj, key) => {
                        const res = resources[key];
                        if (res)
                            obj[key] = animation.fromMotion3Json(res.data);
                        return obj;
                    }, {});
                    // model
                    const builder = new LIVE2DCUBISMPIXI.ModelBuilder();
                    builder.buildFromModel3Json(loader, resources[MODEL_KEY], (model) => {
                        if (model == null) {
                            reject(new Error('model not found.'));
                            return;
                        }
                        try {
                            resolve({ model, motions, source: assetmodel, url });
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                }, reject);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
