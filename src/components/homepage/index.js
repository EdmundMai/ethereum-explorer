import React from "react";
import { connect } from "react-redux";

import {
  getAverageGasPrice,
  getAverageBlockFullness,
  getAverageBlockSize,
} from "../../redux/selectors/ethereum-selectors";

import ethereumActions from "../../redux/actions/ethereum-actions";

import Main from "./Main";

export const Homepage = ({
  blocks,
  numberOfBlocksToDisplay,
  isLoading,
  fetchBlockRange,
  averageGasPrice,
  averageBlockFullness,
  averageBlockSize,
}) => (
  <Main
    blocks={blocks}
    numberOfBlocksToDisplay={numberOfBlocksToDisplay}
    isLoading={isLoading}
    fetchBlockRange={fetchBlockRange}
    averageGasPrice={averageGasPrice}
    averageBlockFullness={averageBlockFullness}
    averageBlockSize={averageBlockSize}
  />
);

const mapStateToProps = state => ({
  blocks: state.ethereum.blocks,
  numberOfBlocksToDisplay: state.ethereum.numberOfBlocksToDisplay,
  isLoading: state.ethereum.isLoading,
  averageGasPrice: getAverageGasPrice(state),
  averageBlockFullness: getAverageBlockFullness(state),
  averageBlockSize: getAverageBlockSize(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBlockRange: ({ startingBlockNumber, endingBlockNumber }) =>
    dispatch(
      ethereumActions.fetchBlockRange({
        startingBlockNumber,
        endingBlockNumber,
      })
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
