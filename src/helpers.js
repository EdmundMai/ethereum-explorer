import BigNumber from "bignumber.js";

export const hexToNumber = hex => BigNumber(hex, 16).toNumber();

export const weiToEth = wei =>
  new BigNumber(wei).dividedBy(new BigNumber("1000000000000000000"));
