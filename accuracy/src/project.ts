import {makeProject} from '@motion-canvas/core';

import baseAccuracyToonUp from './scenes/baseAccuracyToonUp?scene';
import gagFormula from './scenes/gagFormula?scene';
import baseAccuracyTrap from './scenes/baseAccuracyTrap?scene';
import baseAccuracyLure from './scenes/baseAccuracyLure?scene';
import baseAccuracySound from './scenes/baseAccuracySound?scene';
import baseAccuracyThrow from './scenes/baseAccuracyThrow?scene';
import baseAccuracySquirt from './scenes/baseAccuracySquirt?scene';
import baseAccuracyDrop from './scenes/baseAccuracyDrop?scene';
import trackExp from './scenes/trackExp?scene';
import bonusStun from './scenes/bonusStun?scene';
import cogDefence from './scenes/cogDefence?scene';
import newFormula from './scenes/newFormula?scene';
import newFormulaSecond from './scenes/newFormulaSecond?scene';
import newFormulaThird from './scenes/newFormulaThird?scene';
import cogDefenceMain from './scenes/cogDefenceMain?scene';
import newFormulaFourth from './scenes/newFormulaFourth.tsx?scene';


export default makeProject({
  scenes: [
    gagFormula,
    newFormula,
    baseAccuracyToonUp, baseAccuracyTrap, baseAccuracyLure, baseAccuracySound, baseAccuracyThrow, baseAccuracySquirt, baseAccuracyDrop,
    newFormulaSecond,
    trackExp,
    newFormulaThird,
    cogDefenceMain,
    newFormulaFourth,
    bonusStun,
  ],
});
