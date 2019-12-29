import { L2DComponentPublicMember } from './component';
import { Entity } from 'aframe';
/**
 * Get component instance from a node.
 *
 * @param {(Entity<any> | Element)} node Node that contains a-l2d component.
 */
export declare function getComponent(node: Entity<any> | Element): L2DComponentPublicMember | null;
/**
 * Get component instances from children in root.
 *
 * @param {(Element | Document)} root Node that contains a-l2d component.
 */
export declare function getComponents(root: Element | Document): L2DComponentPublicMember[];
/**
 * Register component and primitive.
 */
export declare function register(): void;
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
/**
 * Main class.
 */
export declare class AL2D {
    private _opt;
    private _registerError;
    /**
     * Error that occured on regster compoentn and primitive.
     */
    get registerError(): Error | null;
    /**
     * Creates an instance of AL2D.
     * @param {Partial<AL2DOption>} [option] See [[AL2DOption]].
     */
    constructor(option?: Partial<AL2DOption>);
    private doInit;
    /**
     * Initialize method. (Sync)
     */
    init(): void;
    /**
     * Initialize method. (Async)
     * Promise.then called when all assets are loaded.
     *
     * @returns {Promise<L2DComponentPublicMember[]>}
     */
    initAsync(): Promise<L2DComponentPublicMember[]>;
}
