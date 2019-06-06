export const FETCH_BLOCK_RANGE = "eth-explorer/ethereum/fetch-block-range";
export const FETCH_BLOCK = "eth-explorer/ethereum/fetch-block";
export const FETCH_BLOCK_SUCCESS = "eth-explorer/ethereum/fetch-block-success";
export const FETCH_BLOCK_FAILURE = "eth-explorer/ethereum/fetch-block-failure";

const ACTIONS = Object.freeze({
  FETCH_BLOCK_RANGE,
  FETCH_BLOCK,
  FETCH_BLOCK_SUCCESS,
  FETCH_BLOCK_FAILURE,

  fetchBlockRange: ({ startingBlockNumber, endingBlockNumber }) => ({
    type: FETCH_BLOCK_RANGE,
    payload: { startingBlockNumber, endingBlockNumber },
  }),
  fetchBlock: ({ blockNumber }) => ({
    type: FETCH_BLOCK,
    payload: { blockNumber },
  }),
  fetchBlockSuccess: ({
    number,
    timestamp,
    transactions,
    gasLimit,
    gasUsed,
  }) => ({
    type: FETCH_BLOCK_SUCCESS,
    payload: { number, timestamp, transactions, gasLimit, gasUsed },
  }),
  fetchBlockFailure: ({ error }) => ({
    type: FETCH_BLOCK_FAILURE,
    payload: { error },
  }),
});

export default ACTIONS;
