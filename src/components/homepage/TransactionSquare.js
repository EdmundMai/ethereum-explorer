import React from "react";
import styled from "styled-components";
import _ from "lodash";
import ReactTooltip from "react-tooltip";

const Container = styled.div``;

const Square = styled.div`
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
  color: #3A3479;
`;

const PriceInfo = styled.h5`
  display: flex;
  flex-direction: column;
`;

export const TransactionSquare = ({ hash, from, to, value, input }) => (
  <Container>
    <Square data-tip data-for={hash} />
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
          <Value>{value} ETH</Value>
        </PriceInfo>
      </Tooltip>
    </ReactTooltip>
  </Container>
);

export default TransactionSquare;
