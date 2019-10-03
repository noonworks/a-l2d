import { L2D_COMPONENT, COMPONENT_NAME } from './component';
import { L2D_PRIMITIVE, PRIMITIVE_NAME } from './primitive';

/**
 * Register component and primitive.
 */
export function register(): void {
  // register component before register primitive.
  AFRAME.registerComponent(COMPONENT_NAME, L2D_COMPONENT);
  AFRAME.registerPrimitive(PRIMITIVE_NAME, L2D_PRIMITIVE);
}
