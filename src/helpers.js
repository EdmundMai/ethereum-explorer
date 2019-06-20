import BigNumber from "bignumber.js";
import * as Web3Utils from "web3-utils";

export const hexToNumber = hex => BigNumber(hex, 16).toNumber();
export const numberToHex = number => Web3Utils.toHex(number);

export const weiToGwei = wei =>
  new BigNumber(wei).dividedBy(new BigNumber("1000000000"));

export const weiToEth = wei =>
  new BigNumber(wei).dividedBy(new BigNumber("1000000000000000000"));
