import { createSelector } from "reselect";
import _ from "lodash";

import { hexToNumber, weiToGwei } from "../../helpers";

const getBlocks = state => state.ethereum.blocks;

export const getAverageGasPrice = createSelector([getBlocks], blocks => {
  const mean =
    _.chain(blocks)
      .map(({ transactions }) => transactions)
      .flatten()
      .map(({ gasPrice }) => weiToGwei(hexToNumber(gasPrice)).valueOf())
      .map(parseFloat)
      .mean()
      .value() || 0;

  return mean.toFixed(0);
});

export const getAverageBlockFullness = createSelector([getBlocks], blocks => {
  const mean =
    _.meanBy(blocks, ({ gasUsed, gasLimit }) => gasUsed / gasLimit) || 0;
  return Math.floor(mean * 100) / 100.0;
});
