import axios from "axios";

const INFURA_PROVIDER =
  "https://mainnet.infura.io/v3/a40f331b1e204073b73e27628a5cb308";

const getLatestBlockNumber = () =>
  axios.post(INFURA_PROVIDER, {
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1,
  });

const getBlockByNumber = blockNumber =>
  axios.post(INFURA_PROVIDER, {
    jsonrpc: "2.0",
    method: "eth_getBlockByNumber",
    params: [blockNumber.toString(), true],
    id: 1,
  });

export default {
  getLatestBlockNumber,
  getBlockByNumber,
};
