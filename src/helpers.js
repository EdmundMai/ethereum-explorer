import BigNumber from "bignumber.js";

export const hexToNumber = hex => BigNumber(hex, 16).toNumber();
