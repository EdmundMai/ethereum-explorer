import ethereumActions from "../actions/ethereum-actions";
import _ from "lodash";

import { DEFAULT_BLOCKS_SHOWN } from "../../config";

const initState = {
  isLoading: true,
  numberOfBlocksToDisplay: 0,
  blocks: [],
};

const blockGenerator = ({
  number,
  timestamp,
  transactions,
  gasLimit,
  gasUsed,
}) => ({
  number,
  timestamp,
  transactions: transactions.map(({ hash, from, to, value, gasPrice }) =>
    transactionGenerator({ hash, from, to, value, gasPrice })
  ),
  gasLimit,
  gasUsed,
});

const transactionGenerator = ({ hash, from, to, value, gasPrice }) => ({
  hash,
  from,
  to,
  value,
  gasPrice,
});

export default (state = initState, action) => {
  switch (action.type) {
    case ethereumActions.FETCH_BLOCK_RANGE:
      const { startingBlockNumber, endingBlockNumber } = action.payload;
      const difference = endingBlockNumber - startingBlockNumber;
      return {
        ...state,
        isLoading: true,
        numberOfBlocksToDisplay: state.numberOfBlocksToDisplay + difference,
      };

    case ethereumActions.FETCH_BLOCK_SUCCESS:
      const {
        number,
        timestamp,
        transactions,
        gasLimit,
        gasUsed,
      } = action.payload;

      const blocks = _.orderBy(
        [
          ...state.blocks,
          blockGenerator({
            number,
            timestamp,
            transactions,
            gasLimit,
            gasUsed,
          }),
        ],
        ["number"],
        ["desc"]
      );

      return {
        ...state,
        blocks,
        isLoading: state.numberOfBlocksToDisplay === blocks.length,
      };

    default:
      return state;
  }
};
