import {makeProject} from '@motion-canvas/core';

import baseAccuracyToonUp from './scenes/baseAccuracyToonUp?scene';
import gagFormula from './scenes/gagFormula?scene';
import baseAccuracyTrap from './scenes/baseAccuracyTrap?scene';

export default makeProject({
  scenes: [gagFormula, baseAccuracyToonUp, baseAccuracyTrap],
});
