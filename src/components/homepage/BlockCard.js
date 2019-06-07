import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import ReactTooltip from "react-tooltip";

import CoinGeckoAPI from "../../services/coin-gecko-api";

import CardWrapper from "./CardWrapper";
import CardHeader from "./CardHeader";
import CardGrid from "./CardGrid";
import TransactionSquare from "./TransactionSquare";

import ICON_CARET_RIGHT from "../../assets/images/icon-caret-right.png";

const MoreTransactionsButton = styled.button`
  align-items: center;
  background: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border: none;
  color: #dad9e6;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  outline: none;
  padding: 0;
  visibility: ${props => (props.hide ? "hidden" : "visible")};
  width: 100%;
`;

const ButtonText = styled.div`
  font-size: 13px;
  padding: 8px 15px;
  text-transform: uppercase;
`;

const CaretWrapper = styled.div`
  background-color: #9390b5;
  padding: 9px 12px;
`;

const Caret = styled.img`
  height: 8px;
  width: 8px;
`;

const BlockCard = ({ blockNumber, timestamp, transactions }) => {
  const [ethToUsdPrice, setEthToUsdPrice] = useState(0);
  const [isViewingFirstPage, setIsViewingFirstPage] = useState(true);

  useEffect(
    () => {
      if (!ethToUsdPrice) {
        const date = moment(timestamp * 1000).format("DD-MM-YYYY");
        CoinGeckoAPI.getUsdPrice({ date }).then(({ data }) => {
          const {
            market_data: {
              current_price: { usd },
            },
          } = data;
          setEthToUsdPrice(usd);
        });
      }
    },
    [ethToUsdPrice, timestamp]
  );

  const paginatedTransactions = isViewingFirstPage
    ? transactions.slice(0, 100)
    : transactions.slice(100, 200);

  return (
    <CardWrapper>
      <CardHeader
        blockNumber={blockNumber}
        timestamp={timestamp}
        transactionCount={transactions.length}
      />
      <CardGrid>
        {paginatedTransactions.map(({ hash, from, to, value }) => (
          <TransactionSquare
            key={hash}
            hash={hash}
            from={from}
            to={to}
            value={value}
            ethToUsdPrice={ethToUsdPrice}
          />
        ))}
      </CardGrid>
      <MoreTransactionsButton
        hide={transactions.length <= 100}
        onClick={() => setIsViewingFirstPage(!isViewingFirstPage)}>
        {isViewingFirstPage ? (
          <React.Fragment>
            <ButtonText>{transactions.length - 100} more TX</ButtonText>
            <CaretWrapper>
              <Caret src={ICON_CARET_RIGHT} />
            </CaretWrapper>
          </React.Fragment>
        ) : (
          <ButtonText>Back</ButtonText>
        )}
      </MoreTransactionsButton>
      <ReactTooltip place="right" type="light" effect="solid" />
    </CardWrapper>
  );
};

export default BlockCard;
