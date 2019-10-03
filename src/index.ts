import { register } from './l2d';
import { showError } from './l2d/util';

try {
  register();
} catch (error) {
  showError('', error);
}
