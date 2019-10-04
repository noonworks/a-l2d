import {
  L2D_COMPONENT,
  COMPONENT_NAME,
  L2DComponentPublicMember
} from './component';
import { L2D_PRIMITIVE, PRIMITIVE_NAME } from './primitive';
import { Entity } from 'aframe';

/**
 * Get component instance from a node.
 *
 * @param {(Entity<any> | Element)} node Node that contains a-l2d component.
 */
export function getComponent(
  node: Entity<any> | Element
): L2DComponentPublicMember | null {
  const cmps = (node as Entity<any>).components;
  if (!cmps) return null;
  const cmp = cmps[COMPONENT_NAME];
  if (!cmp) return null;
  return cmp;
}

/**
 * Get component instances from children in root.
 *
 * @param {(Element | Document)} root Node that contains a-l2d component.
 */
export function getComponents(
  root: Element | Document
): L2DComponentPublicMember[] {
  const nodes = Array.from(root.querySelectorAll(PRIMITIVE_NAME));
  return nodes
    .map(node => getComponent(node))
    .filter(r => r != null) as L2DComponentPublicMember[];
}

/**
 * Register component and primitive.
 */
export function register(): void {
  // register component before register primitive.
  AFRAME.registerComponent(COMPONENT_NAME, L2D_COMPONENT);
  AFRAME.registerPrimitive(PRIMITIVE_NAME, L2D_PRIMITIVE);
}

function showError(error: Error): void {
  const errmsg = '[A-L2D ERROR] ' + error.message;
  console.log(errmsg);
  console.log(error);
  alert('[A-L2D] エラーが発生しました。\n' + errmsg);
}

function showErrors(errors: Error[]): void {
  if (errors.length == 0) return;
  if (errors.length == 1) {
    showError(errors[0]);
    return;
  }
  showError(
    new Error(
      '' + errors.length + '個のエラーが発生しました。\n' + errors[0].message
    )
  );
}

/**
 * Options for AL2D class.
 */
export interface AL2DOption {
  /**
   * Timeout for asset loading.
   */
  timeout: number;
  /**
   * Show alert on error.
   */
  showAlert: boolean;
}

const DEFAULT_L2DOPTION: AL2DOption = {
  timeout: 10000,
  showAlert: true
};

/**
 * Main class.
 */
export class AL2D {
  private _opt: AL2DOption;
  private _registerError: Error | null = null;

  /**
   * Error that occured on regster compoentn and primitive.
   */
  public get registerError(): Error | null {
    return this._registerError;
  }

  /**
   * Creates an instance of AL2D.
   * @param {Partial<AL2DOption>} [option] See [[AL2DOption]].
   */
  constructor(option?: Partial<AL2DOption>) {
    this._opt = { ...DEFAULT_L2DOPTION, ...(option || {}) };
  }

  private doInit(): void {
    try {
      register();
    } catch (error) {
      this._registerError = error;
      if (this._opt.showAlert) showError(error);
    }
  }

  /**
   * Initialize method. (Sync)
   */
  public init(): void {
    if (this._opt.showAlert) this.initAsync().then();
    else this.doInit();
  }

  /**
   * Initialize method. (Async)
   * Promise.then called when all assets are loaded.
   *
   * @returns {Promise<L2DComponentPublicMember[]>}
   */
  public initAsync(): Promise<L2DComponentPublicMember[]> {
    this.doInit();
    return new Promise<L2DComponentPublicMember[]>(
      (
        resolve: (components: L2DComponentPublicMember[]) => void,
        reject: (reason: any) => void
      ): void => {
        let timeout = this._opt.timeout / 100;
        const checkCmp = (): void => {
          try {
            const components = getComponents(document);
            for (const cmp of components) {
              if (!cmp.loadState.assetLoading.finished) {
                timeout--;
                if (timeout < 0) {
                  const e = new Error('Timeout for asset loading.');
                  if (this._opt.showAlert) showError(e);
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
                .filter(e => e != null) as Error[];
              showErrors(errors);
            }
            resolve(components);
          } catch (error) {
            reject(error);
          }
        };
        checkCmp();
      }
    );
  }
}
