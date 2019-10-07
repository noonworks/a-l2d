import { L2D_COMPONENT, COMPONENT_NAME } from './component';
import { L2D_PRIMITIVE, PRIMITIVE_NAME } from './primitive';
/**
 * Get component instance from a node.
 *
 * @param {(Entity<any> | Element)} node Node that contains a-l2d component.
 */
export function getComponent(node) {
    const cmps = node.components;
    if (!cmps)
        return null;
    const cmp = cmps[COMPONENT_NAME];
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
    const nodes = Array.from(root.querySelectorAll(PRIMITIVE_NAME));
    return nodes
        .map(node => getComponent(node))
        .filter(r => r != null);
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
    const errmsg = '[A-L2D ERROR] ' + error.message;
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
const DEFAULT_L2DOPTION = {
    timeout: 10000,
    showAlert: true
};
/**
 * Main class.
 */
export class AL2D {
    /**
     * Creates an instance of AL2D.
     * @param {Partial<AL2DOption>} [option] See [[AL2DOption]].
     */
    constructor(option) {
        this._registerError = null;
        this._opt = Object.assign(Object.assign({}, DEFAULT_L2DOPTION), (option || {}));
    }
    /**
     * Error that occured on regster compoentn and primitive.
     */
    get registerError() {
        return this._registerError;
    }
    doInit() {
        try {
            register();
        }
        catch (error) {
            this._registerError = error;
            if (this._opt.showAlert)
                showError(error);
        }
    }
    /**
     * Initialize method. (Sync)
     */
    init() {
        if (this._opt.showAlert)
            this.initAsync().then();
        else
            this.doInit();
    }
    /**
     * Initialize method. (Async)
     * Promise.then called when all assets are loaded.
     *
     * @returns {Promise<L2DComponentPublicMember[]>}
     */
    initAsync() {
        this.doInit();
        return new Promise((resolve, reject) => {
            let timeout = this._opt.timeout / 100;
            const checkCmp = () => {
                try {
                    const components = getComponents(document);
                    for (const cmp of components) {
                        if (!cmp.loadState.assetLoading.finished) {
                            timeout--;
                            if (timeout < 0) {
                                const e = new Error('Timeout for asset loading.');
                                if (this._opt.showAlert)
                                    showError(e);
                                reject(e);
                                return;
                            }
                            window.setTimeout(checkCmp, 100);
                            return;
                        }
                    }
                    if (showError) {
                        const errors = components
                            .map(cmp => cmp.loadState.assetLoading.error)
                            .filter(e => e != null);
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
    }
}
