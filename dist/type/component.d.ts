import { Entity, Component } from 'aframe';
import * as THREE from 'three';
import * as PIXI from 'pixi.js';
import { Model } from './model';
/**
 * @ignore
 */
export declare const COMPONENT_NAME = "l2d";
interface L2DSchema {
    src: string;
    textureWidth: number;
    textureHeight: number;
}
/**
 * Public properties of L2D Component.
 */
export interface L2DComponentPublicMember {
    /**
     * Loading state of the component.
     *
     * - `initialized` boolean : Initialized or not.
     * - `assetLoading` : Asset loading state.
     *   - `finished` boolean : Finished or not.
     *   - `error` Error | null : Error on asset loading.
     */
    loadState: {
        initialized: boolean;
        assetLoading: {
            finished: boolean;
            error: Error | null;
        };
    };
}
interface L2DPlaneComponent extends Partial<Component<L2DSchema>>, L2DComponentPublicMember {
    _marker: Entity<any> | null;
    _mesh: THREE.Object3D | null;
    _models: Model[];
    _orientationchanged: boolean;
    _pixiapp: PIXI.Application | null;
    schema: {
        src: {
            type: 'asset';
        };
        textureWidth: {
            type: 'int';
            default: 512;
        };
        textureHeight: {
            type: 'int';
            default: 512;
        };
    };
    multiple: boolean;
    init: () => void;
    update: (oldData: L2DSchema) => void;
    tick: () => void;
    _initPixiApp: () => void;
    _setTextureSize: () => void;
    _updateAsset: (oldData: L2DSchema) => void;
}
/**
 * @ignore
 * Component object to register to A-Frame.
 */
export declare const L2D_COMPONENT: L2DPlaneComponent;
export {};
