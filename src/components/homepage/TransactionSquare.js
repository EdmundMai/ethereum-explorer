import React from "react";
import styled, { ThemeProvider } from "styled-components";
import ReactTooltip from "react-tooltip";
import theme from "../../assets/styles/theme";

import { weiToEth, hexToNumber } from "../../helpers";
import Square from "./Square";

const Container = styled.div`
  display: flex;
`;

const Tooltip = styled.div`
  padding: 10px 0;
`;

const SenderInfo = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const InfoType = styled.h5`
  color: ${({ theme }) => theme.tooltip.secondary.color};
  font-size: 12px;
  margin: 0;
  text-transform: uppercase;
`;

const Value = styled.h5`
  color: ${({ theme }) => theme.tooltip.primary.color};
  font-size: 13px;
  margin: 0;
  letter-spacing: 1px;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsdPrice = styled.span`
  color: ${({ theme }) => theme.tooltip.tertiary.color};
  margin-left: 5px;
`;

export const TransactionSquare = ({ hash, from, to, value, ethToUsdPrice }) => {
  const wei = hexToNumber(value);
  const ethAmount = parseFloat(weiToEth(wei));

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default TransactionSquare;
