import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import { weiToEth, hexToNumber } from "../../helpers";

const Container = styled.div`
  display: flex;
`;

const Square = styled.a`
  background-color: white;
  display: inline-block;
  height: 14px;
  margin: 1px 2px;
  opacity: ${props =>
    props.opacity > 1 ? 1 : Math.max(props.opacity, 0.1) / 1.0};
  width: 14px;
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
  color: #666666;
  font-size: 10px;
  margin: 0;
  text-transform: uppercase;
`;

const Value = styled.h5`
  color: #3a3479;
  font-size: 10px;
  margin: 0;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsdPrice = styled.span`
  color: #7e7e7e;
  font-size: 10px;
`;

export const TransactionSquare = ({ hash, from, to, value, ethToUsdPrice }) => {
  const wei = hexToNumber(value);
  const ethAmount = parseFloat(weiToEth(wei));

  return (
    <Container>
      <Square
        opacity={ethAmount}
        data-tip
        data-for={hash}
        target="_blank"
        href={`https://etherscan.io/tx/${hash}`}
      />
      <ReactTooltip id={hash} place="right" type="light" effect="solid">
        <Tooltip>
          <SenderInfo>
            <AddressInfo>
              <InfoType>From</InfoType>
              <Value>
                {from ? from.slice(0, 6) + "..." + from.slice(-4) : "Unknown"}
              </Value>
            </AddressInfo>
            <AddressInfo>
              <InfoType>To</InfoType>
              <Value>
                {to ? to.slice(0, 6) + "..." + to.slice(-4) : "Unknown"}
              </Value>
            </AddressInfo>
          </SenderInfo>
          <PriceInfo>
            <InfoType>Value</InfoType>
            <Value>
              {ethAmount.toFixed(3)} ETH{" "}
              <UsdPrice>
                ${(ethAmount * ethToUsdPrice).toFixed(2)} @ ${ethToUsdPrice.toFixed(
                  2
                )}
              </UsdPrice>
            </Value>
          </PriceInfo>
        </Tooltip>
      </ReactTooltip>
    </Container>
  );
};

export default TransactionSquare;
