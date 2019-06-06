import ethereumActions from "../actions/ethereum-actions";
import _ from "lodash";

const initState = {
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
  transactions: transactions.map(({ hash, from, to, value, gasPrice, gas }) =>
    transactionGenerator({ hash, from, to, value, gasPrice, gas })
  ),
  gasLimit,
  gasUsed,
});

const transactionGenerator = ({ hash, from, to, value, gasPrice, gas }) => ({
  hash,
  from,
  to,
  value,
  gasPrice,
  gas,
});

export default (state = initState, action) => {
  switch (action.type) {
    case ethereumActions.FETCH_BLOCK_SUCCESS:
      const {
        number,
        timestamp,
        transactions,
        gasLimit,
        gasUsed,
      } = action.payload;

      return {
        ...state,
        blocks: _.orderBy(
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
        ),
      };

    default:
      return state;
  }
};
