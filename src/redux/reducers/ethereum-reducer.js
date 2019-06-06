import ethereumActions from "../actions/ethereum-actions";

const initState = {
  blocks: [],
};

const blockGenerator = ({ number, timestamp, transactions }) => ({
  number,
  timestamp,
  transactions: transactions.map(({ from, to, value, input }) =>
    transactionGenerator({ from, to, value, input })
  ),
});

const transactionGenerator = ({ from, to, value, input }) => ({
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
        blocks: [
          ...state.blocks,
          blockGenerator({ number, timestamp, transactions }),
        ],
      };

    default:
      return state;
  }
};
