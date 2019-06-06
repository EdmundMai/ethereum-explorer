import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import _ from "lodash";
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
  width: 274px;
  height: 370px;
  display: flex;
  margin: 10px;
  flex-direction: column;
  box-shadow: 2px 2px 30px -13px rgba(0, 0, 0, 0.75);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockNumber = styled.h5`
  font-size: 15px;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
`;

const MinedAgo = styled.h5`
  font-size: 12px;
  letter-spacing: 2px;
  color: #d9d8e5;
  margin: 0;
  letter-spacing: 2px;
`;

const RightHeader = styled.div``;

const TransactionCount = styled.h5`
  font-size: 15px;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
`;

const Grid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Square = styled.div`
  width: 15px;
  height: 15px;
  background-color: white;
  margin: 2px 2px;
`;

const MoreTransactionsButton = styled.button`
  display: flex;
  padding: 0;
  cursor: pointer;
  justify-content: space-between;
  width: 100%;
  outline: none;
  background: none;
  border: none;
  color: #dad9e6;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const ButtonText = styled.div`
  text-transform: uppercase;
  padding: 8px 15px;
  font-size: 13px;
`;

const CaretWrapper = styled.div`
  padding: 9px 12px;
  background-color: #9390b5;
`;

const Caret = styled.img`
  width: 8px;
  height: 8px;
`;

export const BlockCard = ({
  blockNumber,
  timestamp,
  transactions,
  gasLimit,
}) => {
  const [ethToUsdPrice, setEthToUsdPrice] = useState(0);
  const [isViewingSecondPage, setIsViewingSecondPage] = useState(false);

  useEffect(() => {
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
  }, []);

  const paginatedTransactions = isViewingSecondPage
    ? transactions.slice(100, 200)
    : transactions.slice(0, 100);
  const chunksOfTen = _.chunk(paginatedTransactions.slice(0, 100), 10);

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
        {chunksOfTen.map((chunk, i) => (
          <Row key={i}>
            {chunk.map(({ hash, from, to, value, gas }) => (
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
          </Row>
        ))}
      </Grid>
      {transactions.length > 100 && (
        <MoreTransactionsButton
          onClick={() => setIsViewingSecondPage(!isViewingSecondPage)}>
          {isViewingSecondPage ? (
            <ButtonText>Back</ButtonText>
          ) : (
            <React.Fragment>
              <ButtonText>{transactions.length - 100} more TX</ButtonText>
              <CaretWrapper>
                <Caret src={ICON_CARET_RIGHT} />
              </CaretWrapper>
            </React.Fragment>
          )}
        </MoreTransactionsButton>
      )}
      <ReactTooltip place="right" type="light" effect="solid" />
    </Container>
  );
};

export default BlockCard;
