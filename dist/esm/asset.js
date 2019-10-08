var MODEL_KEY = 'model3';
var MOTION_KEY_PREFIX = 'motion';
var XHR_RESPONSE_TYPE;
(function (XHR_RESPONSE_TYPE) {
    XHR_RESPONSE_TYPE["JSON"] = "json";
})(XHR_RESPONSE_TYPE || (XHR_RESPONSE_TYPE = {}));
var LOADER_OPT = {
    xhrType: XHR_RESPONSE_TYPE.JSON
};
/**
 * Helper class to load asset.
 */
var AssetLoader = /** @class */ (function () {
    function AssetLoader() {
    }
    /**
     * Load assets of models.
     * @param  {string} src URL of asset JSON. See [[AssetModels]].
     */
    AssetLoader.prototype.load = function (src) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pixiLoad([{ name: 'src', url: src }], function (_, resources) {
                var res = _this.getResult(resources, 'src', reject);
                if (!res)
                    return;
                var data = res.data;
                if (!data) {
                    reject(new Error('Could not parse src [' + src + '].'));
                    return;
                }
                Promise.all(data.models.map(function (am) { return _this.loadModel(am, src); }))
                    .then(resolve)
                    .catch(reject);
            }, reject);
        });
    };
    AssetLoader.prototype.pixiLoad = function (req, cb, reject) {
        var loader = new PIXI.Loader();
        for (var _i = 0, req_1 = req; _i < req_1.length; _i++) {
            var r = req_1[_i];
            loader.add(r.name, r.url, LOADER_OPT);
        }
        loader.load(function (loader, resources) {
            try {
                cb(loader, resources);
            }
            catch (error) {
                reject(error);
            }
        });
    };
    AssetLoader.prototype.getResult = function (resources, name, reject) {
        var res = resources[name];
        if (!res) {
            reject(new Error('Could not load [' + name + '].'));
            return null;
        }
        if (res.error) {
            reject(res.error);
            return null;
        }
        return res;
    };
    AssetLoader.prototype.loadModel = function (assetmodel, url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!assetmodel.assets) {
                reject(new Error('Could not load assets. [assets] not found in JSON.'));
                return;
            }
            try {
                var req = Object.keys(assetmodel.assets).map(function (key) {
                    return { name: key, url: assetmodel.assets[key] };
                });
                _this.pixiLoad(req, function (loader, resources) {
                    // motions
                    var animation = LIVE2DCUBISMFRAMEWORK.Animation;
                    var motions = Object.keys(resources)
                        .filter(function (k) { return k.startsWith(MOTION_KEY_PREFIX); })
                        .reduce(function (obj, key) {
                        var res = resources[key];
                        if (res)
                            obj[key] = animation.fromMotion3Json(res.data);
                        return obj;
                    }, {});
                    // model
                    var builder = new LIVE2DCUBISMPIXI.ModelBuilder();
                    builder.buildFromModel3Json(loader, resources[MODEL_KEY], function (model) {
                        if (model == null) {
                            reject(new Error('model not found.'));
                            return;
                        }
                        try {
                            resolve({ model: model, motions: motions, source: assetmodel, url: url });
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
    };
    return AssetLoader;
}());
export { AssetLoader };
