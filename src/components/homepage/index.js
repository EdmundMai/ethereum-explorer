import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  getAverageGasPrice,
  getAverageBlockFullness,
} from "../../redux/selectors/ethereum-selectors";

import ethereumActions from "../../redux/actions/ethereum-actions";

import Main from "./Main";

export const Homepage = ({
  blocks,
  fetchBlockRange,
  averageGasPrice,
  averageBlockFullness,
}) => (
  <Main
    blocks={blocks}
    fetchBlockRange={fetchBlockRange}
    averageGasPrice={averageGasPrice}
    averageBlockFullness={averageBlockFullness}
  />
);

const mapStateToProps = state => ({
  blocks: state.ethereum.blocks,
  averageGasPrice: getAverageGasPrice(state),
  averageBlockFullness: getAverageBlockFullness(state),
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
