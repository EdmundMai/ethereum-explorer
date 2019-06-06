import React, { useEffect } from "react";
import { connect } from "react-redux";

import ethereumActions from "../../redux/actions/ethereum-actions";

import Main from "./Main";

export const Homepage = ({ blocks, fetchBlockRange }) => (
  <Main blocks={blocks} fetchBlockRange={fetchBlockRange} />
);

const mapStateToProps = state => ({
  blocks: state.ethereum.blocks,
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
