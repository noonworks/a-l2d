import { COMPONENT_NAME } from './component';
const extendDeep = AFRAME.utils.extendDeep;
// The mesh mixin provides common material properties for creating mesh-based primitives.
// This makes the material component a default component and maps all the base material properties.
const meshMixin = AFRAME.primitives.getMeshMixin();
/**
 * @ignore
 */
export const PRIMITIVE_NAME = 'a-' + COMPONENT_NAME;
/**
 * @ignore
 * Primitive object to register to A-Frame.
 */
export const L2D_PRIMITIVE = extendDeep({}, meshMixin, {
    // Preset default components.
    // These components and component properties will be attached to the entity out-of-the-box.
    defaultComponents: {
        geometry: { primitive: 'plane', width: 5, height: 5 },
        material: { color: '#000' },
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: -90, y: 0, z: 0 },
        [COMPONENT_NAME]: {}
    },
    // Defined mappings from HTML attributes to component properties (using dots as delimiters).
    mappings: {
        width: 'geometry.width',
        height: 'geometry.height',
        color: 'material.color',
        textureWidth: COMPONENT_NAME + '.textureWidth',
        textureHeight: COMPONENT_NAME + '.textureHeight',
        src: COMPONENT_NAME + '.src'
    }
});
