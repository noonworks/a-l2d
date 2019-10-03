export type MotionOrderTypes = 'order' | 'random' | 'unique-random';

export interface Motion {
  order: MotionOrderTypes;
  values: string[];
}

export type MotionTypes = 'basic' | 'click';

export interface MotionSetting {
  basic: Motion;
  click: Motion;
}

export interface AssetModel {
  id: string;
  x: number;
  y: number;
  assets: {
    model3: string;
    [assetname: string]: string;
  };
  motions: MotionSetting;
}

export interface AssetModels {
  models: AssetModel[];
}
