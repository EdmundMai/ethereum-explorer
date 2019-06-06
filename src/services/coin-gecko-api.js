import axios from "axios";

const COIN_GECKO_HISTORY_API_URL =
  "https://api.coingecko.com/api/v3/coins/ethereum/history";

// Date should be dd-mm-yyyy format
const getUsdPrice = ({ date }) =>
  axios.get(COIN_GECKO_HISTORY_API_URL, {
    params: {
      date,
    },
  });

export default {
  getUsdPrice,
};
