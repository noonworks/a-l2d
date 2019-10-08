var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { L2D_COMPONENT, COMPONENT_NAME } from './component';
import { L2D_PRIMITIVE, PRIMITIVE_NAME } from './primitive';
/**
 * Get component instance from a node.
 *
 * @param {(Entity<any> | Element)} node Node that contains a-l2d component.
 */
export function getComponent(node) {
    var cmps = node.components;
    if (!cmps)
        return null;
    var cmp = cmps[COMPONENT_NAME];
    if (!cmp)
        return null;
    return cmp;
}
/**
 * Get component instances from children in root.
 *
 * @param {(Element | Document)} root Node that contains a-l2d component.
 */
export function getComponents(root) {
    var nodes = Array.from(root.querySelectorAll(PRIMITIVE_NAME));
    return nodes
        .map(function (node) { return getComponent(node); })
        .filter(function (r) { return r != null; });
}
/**
 * Register component and primitive.
 */
export function register() {
    // register component before register primitive.
    AFRAME.registerComponent(COMPONENT_NAME, L2D_COMPONENT);
    AFRAME.registerPrimitive(PRIMITIVE_NAME, L2D_PRIMITIVE);
}
function showError(error) {
    var errmsg = '[A-L2D ERROR] ' + error.message;
    console.log(errmsg);
    console.log(error);
    alert('[A-L2D] エラーが発生しました。\n' + errmsg);
}
function showErrors(errors) {
    if (errors.length == 0)
        return;
    if (errors.length == 1) {
        showError(errors[0]);
        return;
    }
    showError(new Error('' + errors.length + '個のエラーが発生しました。\n' + errors[0].message));
}
var DEFAULT_L2DOPTION = {
    timeout: 10000,
    showAlert: true
};
/**
 * Main class.
 */
var AL2D = /** @class */ (function () {
    /**
     * Creates an instance of AL2D.
     * @param {Partial<AL2DOption>} [option] See [[AL2DOption]].
     */
    function AL2D(option) {
        this._registerError = null;
        this._opt = __assign(__assign({}, DEFAULT_L2DOPTION), (option || {}));
    }
    Object.defineProperty(AL2D.prototype, "registerError", {
        /**
         * Error that occured on regster compoentn and primitive.
         */
        get: function () {
            return this._registerError;
        },
        enumerable: true,
        configurable: true
    });
    AL2D.prototype.doInit = function () {
        try {
            register();
        }
        catch (error) {
            this._registerError = error;
            if (this._opt.showAlert)
                showError(error);
        }
    };
    /**
     * Initialize method. (Sync)
     */
    AL2D.prototype.init = function () {
        if (this._opt.showAlert)
            this.initAsync().then();
        else
            this.doInit();
    };
    /**
     * Initialize method. (Async)
     * Promise.then called when all assets are loaded.
     *
     * @returns {Promise<L2DComponentPublicMember[]>}
     */
    AL2D.prototype.initAsync = function () {
        var _this = this;
        this.doInit();
        return new Promise(function (resolve, reject) {
            var timeout = _this._opt.timeout / 100;
            var checkCmp = function () {
                try {
                    var components = getComponents(document);
                    for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
                        var cmp = components_1[_i];
                        if (!cmp.loadState.assetLoading.finished) {
                            timeout--;
                            if (timeout < 0) {
                                var e = new Error('Timeout for asset loading.');
                                if (_this._opt.showAlert)
                                    showError(e);
                                reject(e);
                                return;
                            }
                            window.setTimeout(checkCmp, 100);
                            return;
                        }
                    }
                    if (showError) {
                        var errors = components
                            .map(function (cmp) { return cmp.loadState.assetLoading.error; })
                            .filter(function (e) { return e != null; });
                        showErrors(errors);
                    }
                    resolve(components);
                }
                catch (error) {
                    reject(error);
                }
            };
            checkCmp();
        });
    };
    return AL2D;
}());
export { AL2D };
