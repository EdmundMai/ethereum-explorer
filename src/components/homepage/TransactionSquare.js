import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import Web3 from "web3";
import BigNumber from "bignumber.js";

import CoinGeckoAPI from "../../services/coin-gecko-api";
import { weiToEth, hexToNumber } from "../../helpers";

const Container = styled.div``;

const Square = styled.a`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: white;
  margin: 2px 2px;
`;

const Tooltip = styled.div``;

const SenderInfo = styled.div`
  display: flex;
`;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const InfoType = styled.h5`
  margin: 0;
  font-size: 10px;
  text-transform: uppercase;
  color: #666666;
`;

const Value = styled.h5`
  margin: 0;
  font-size: 10px;
  color: #3a3479;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsdPrice = styled.span`
  color: #7e7e7e;
  font-size: 10px;
`;

export const TransactionSquare = ({
  timestamp,
  hash,
  from,
  to,
  value,
  input,
}) => {
  const [usdPrice, setUsdPrice] = useState(0);

  const fetchUsd = () => {
    if (!usdPrice) {
      const date = moment(timestamp * 1000).format("DD-MM-YYYY");
      CoinGeckoAPI.getUsdPrice({ date }).then(({ data }) => {
        const {
          market_data: {
            current_price: { usd },
          },
        } = data;
        setUsdPrice(usd);
      });
    }
  };

  const wei = hexToNumber(value);
  const ethAmount = weiToEth(wei);

  return (
    <Container>
      <Square
        data-tip
        data-for={hash}
        onMouseEnter={fetchUsd}
        target="_blank"
        href={`https://etherscan.io/tx/${hash}`}
      />
      <ReactTooltip id={hash} place="right" type="light" effect="solid">
        <Tooltip>
          <SenderInfo>
            <AddressInfo>
              <InfoType>From</InfoType>
              <Value>{from.slice(0, 6) + "..." + from.slice(-4)}</Value>
            </AddressInfo>
            <AddressInfo>
              <InfoType>To</InfoType>
              <Value>{to.slice(0, 6) + "..." + to.slice(-4)}</Value>
            </AddressInfo>
          </SenderInfo>
          <PriceInfo>
            <InfoType>Value</InfoType>
            <Value>
              {ethAmount.toFixed(3)} ETH{" "}
              <UsdPrice>
                ${(ethAmount * usdPrice).toFixed(2)} @ ${usdPrice.toFixed(2)}
              </UsdPrice>
            </Value>
          </PriceInfo>
        </Tooltip>
      </ReactTooltip>
    </Container>
  );
};

export default TransactionSquare;
