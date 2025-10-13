import {makeProject} from '@motion-canvas/core';

import baseAccuracyToonUp from './scenes/baseAccuracyToonUp?scene';
import gagFormula from './scenes/gagFormula?scene';
import baseAccuracyTrap from './scenes/baseAccuracyTrap?scene';
import baseAccuracyLure from './scenes/baseAccuracyLure?scene';
import baseAccuracySound from './scenes/baseAccuracySound?scene';
import baseAccuracyThrow from './scenes/baseAccuracyThrow?scene';
import baseAccuracySquirt from './scenes/baseAccuracySquirt?scene';
import baseAccuracyDrop from './scenes/baseAccuracyDrop?scene';
import gagFormulaSecond from './scenes/gagFormulaSecond?scene';
import trackExp from './scenes/trackExp?scene';
import gagFormulaThird from './scenes/gagFormulaThird?scene';
import bonusStun from './scenes/bonusStun?scene';
import cogDefence from './scenes/cogDefence?scene';


export default makeProject({
  scenes: [
    gagFormula,
    baseAccuracyToonUp, baseAccuracyTrap, baseAccuracyLure, baseAccuracySound, baseAccuracyThrow, baseAccuracySquirt, baseAccuracyDrop,
    gagFormulaSecond,
    trackExp,
    gagFormulaThird,
    cogDefence,
    bonusStun,
  ],
});
