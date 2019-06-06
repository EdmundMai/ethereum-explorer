import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import ReactTooltip from "react-tooltip";

import CoinGeckoAPI from "../../services/coin-gecko-api";

import TransactionSquare from "./TransactionSquare";

import ICON_CARET_RIGHT from "../../assets/images/icon-caret-right.png";

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    ss: "%ss",
    m: "a minute",
    mm: "%dm",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%dd",
    M: "a month",
    MM: "%dM",
    y: "a year",
    yy: "%dY",
  },
});

const Container = styled.div`
  background-color: #746fa0;
  box-shadow: 2px 2px 30px -13px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  height: 370px;
  margin: 10px;
  width: 274px;
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockNumber = styled.h5`
  color: #ffffff;
  font-size: 15px;
  letter-spacing: 2px;
  margin: 0;
`;

const MinedAgo = styled.h5`
  color: #d9d8e5;
  font-size: 12px;
  letter-spacing: 2px;
  letter-spacing: 2px;
  margin: 0;
`;

const RightHeader = styled.div``;

const TransactionCount = styled.h5`
  color: #ffffff;
  font-size: 15px;
  letter-spacing: 2px;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  flex: 1;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(10, minmax(1rem, 1fr));
  grid-template-rows: repeat(10, minmax(1rem, 1fr));
  padding: 15px;
`;

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

export const BlockCard = ({
  blockNumber,
  timestamp,
  transactions,
  gasLimit,
}) => {
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
    <Container>
      <Header>
        <LeftHeader>
          <BlockNumber>#{blockNumber.toLocaleString()}</BlockNumber>
          <MinedAgo>mined {moment(timestamp * 1000).fromNow()}</MinedAgo>
        </LeftHeader>
        <RightHeader>
          <TransactionCount>
            {transactions.length}
            {"  "}TXs
          </TransactionCount>
        </RightHeader>
      </Header>
      <Grid>
        {paginatedTransactions.map(({ hash, from, to, value, gas }) => (
          <TransactionSquare
            opacity={gas / gasLimit}
            key={hash}
            hash={hash}
            from={from}
            to={to}
            value={value}
            ethToUsdPrice={ethToUsdPrice}
          />
        ))}
      </Grid>
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
    </Container>
  );
};

export default BlockCard;
