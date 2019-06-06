import ethereumActions from "../actions/ethereum-actions";
import _ from "lodash";

const initState = {
  blocks: [],
};

const blockGenerator = ({ number, timestamp, transactions }) => ({
  number,
  timestamp,
  transactions: transactions.map(({ hash, from, to, value, input }) =>
    transactionGenerator({ hash, from, to, value, input })
  ),
});

const transactionGenerator = ({ hash, from, to, value, input }) => ({
  hash,
  from,
  to,
  value,
  input,
});

export default (state = initState, action) => {
  switch (action.type) {
    case ethereumActions.FETCH_BLOCK_SUCCESS:
      const { number, timestamp, transactions } = action.payload;

      return {
        ...state,
        blocks: _.orderBy(
          [
            ...state.blocks,
            blockGenerator({ number, timestamp, transactions }),
          ],
          ["number"],
          ["desc"]
        ),
      };

    default:
      return state;
  }
};
