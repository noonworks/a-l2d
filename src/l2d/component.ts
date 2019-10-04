import { Entity, Component } from 'aframe';
import * as THREE from 'three';
import * as PIXI from 'pixi.js';
import { appendModels, Model } from './model';
import { AssetLoader, Asset } from './asset';

/**
 * @ignore
 */
export const COMPONENT_NAME = 'l2d';

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

interface L2DPlaneComponent
  extends Partial<Component<L2DSchema>>,
    L2DComponentPublicMember {
  _marker: Entity<any> | null;
  _mesh: THREE.Object3D | null;
  _models: Model[];
  _orientationchanged: boolean;
  _pixiapp: PIXI.Application | null;
  // component config members
  schema: {
    src: { type: 'asset' };
    textureWidth: { type: 'int'; default: 512 };
    textureHeight: { type: 'int'; default: 512 };
  };
  multiple: boolean;
  // lifecycle methods
  init: () => void;
  update: (oldData: L2DSchema) => void;
  tick: () => void;
  // private methods
  _initPixiApp: () => void;
  _setTextureSize: () => void;
  _updateAsset: (oldData: L2DSchema) => void;
}

/**
 * @ignore
 * Component object to register to A-Frame.
 */
export const L2D_COMPONENT: L2DPlaneComponent = {
  _marker: null,
  _mesh: null,
  _models: [],
  _orientationchanged: false,
  _pixiapp: null,
  multiple: true,
  schema: {
    src: { type: 'asset' },
    textureWidth: { type: 'int', default: 512 },
    textureHeight: { type: 'int', default: 512 }
  },
  loadState: {
    initialized: false,
    assetLoading: {
      finished: false,
      error: null
    }
  },

  _initPixiApp: function(): void {
    this._pixiapp = new PIXI.Application({
      width: 0,
      height: 0,
      transparent: true
    });
    // create material
    const texture = new THREE.Texture(this._pixiapp.view);
    texture.premultiplyAlpha = true;
    const material = new THREE.MeshStandardMaterial({});
    material.map = texture;
    material.metalness = 0;
    material.premultipliedAlpha = true;
    material.transparent = true;
    // set mesh
    const el = (this as any).el as Entity<any>;
    if (!el) throw new Error('Element [el] not found.');
    this._mesh = el.getObject3D('mesh');
    if (!this._mesh) throw new Error('Mesh [mesh] not found.');
    (this._mesh as any).material = material;
  },

  init: function(): void {
    // get element
    const el = (this as any).el as Entity<any>;
    if (!el) throw new Error('Element [el] not found.');
    this._marker = el.parentNode as Entity<any>;
    // initialize private members
    this._mesh = this._mesh;
    this._models = this._models || [];
    this._orientationchanged = this._orientationchanged || false;
    this._pixiapp = this._pixiapp;
    this._initPixiApp();
    // PCとスマホの選択イベントの振り分け
    const eventname =
      window.ontouchstart === undefined ? 'click' : 'touchstart';
    // on click (tap)
    window.addEventListener(eventname, () => {
      // クリックモーションの再生
      for (const mw of this._models) {
        mw.playClick();
      }
    });
    // on orientation changed
    window.addEventListener('orientationchange', () => {
      // 画面が回転するとモデルの表示位置がずれるため描画を止める
      if (this._pixiapp) this._pixiapp.stage.renderable = false;
      // 画面の回転フラグを立てる
      this._orientationchanged = true;
    });
    // setup element
    (el.object3D as any).front = new THREE.Object3D();
    (el.object3D as any).front.position.set(0, 0, -1);
    el.object3D.add((el.object3D as any).front);
    // set state
    this.loadState = this.loadState;
    this.loadState.initialized = true;
  },

  _setTextureSize: function(): void {
    if (!this._mesh || !this.data || !this._pixiapp) return;
    const tW = this.data.textureWidth;
    const tH = this.data.textureHeight;
    this._pixiapp.view.width = tW;
    this._pixiapp.view.height = tH;
    this._pixiapp.renderer.resize(tW, tH);
    for (const mw of this._models) {
      mw.model.position = new PIXI.Point(
        tW * mw.model.pos_x,
        tH * mw.model.pos_y
      );
      mw.model.scale = new PIXI.Point(tW * 0.5, tH * 0.5);
      mw.model.masks.resize(
        this._pixiapp.view.width,
        this._pixiapp.view.height
      );
    }
    (this._mesh as any).material.map.needsUpdate = true;
  },

  _updateAsset: function(oldData: L2DSchema): void {
    if (oldData && this.data && oldData.src == this.data.src) return;
    if (!this.data) return;
    this.loadState.assetLoading.finished = false;
    this.loadState.assetLoading.error = null;
    new AssetLoader()
      .load(this.data.src)
      .then((assets: Asset[]): void => {
        this.loadState.assetLoading.finished = true;
        if (!this.data) {
          this.loadState.assetLoading.error = new Error(
            'Could not find data.src.'
          );
          return;
        }
        this._models = assets.map(asset => new Model(asset));
        this._initPixiApp();
        if (!this._pixiapp) {
          this.loadState.assetLoading.error = new Error(
            'Pixiapp [pixiapp] not found.'
          );
          return;
        }
        try {
          appendModels(this._models, this._pixiapp);
          this._setTextureSize();
        } catch (error) {
          this.loadState.assetLoading.error = error;
        }
      })
      .catch(reason => {
        this.loadState.assetLoading.error = reason;
      });
  },

  update: function(oldData: L2DSchema): void {
    this._setTextureSize();
    this._updateAsset(oldData);
  },

  tick: function(): void {
    if (!this._marker) return;
    if (this._marker.object3D.visible) {
      if (!this._pixiapp) return;
      // 画面が回転した直後（＝モデルの表示位置がずれている）でないなら描画する
      if (!this._orientationchanged) {
        this._pixiapp.stage.renderable = true;
      }
      if (this._mesh) (this._mesh as any).material.map.needsUpdate = true;
      for (const mw of this._models) {
        // モーション再生
        if (mw.motionFinished) mw.playBasic();
      }
    } else {
      // マーカーが外れたら描画を止める
      if (this._pixiapp) this._pixiapp.stage.renderable = false;
      // マーカーが外れたら画面の回転フラグを折る
      // →マーカーの再検出時にモデルの表示位置が修正されるため
      this._orientationchanged = false;
    }
  }
};
