import React from "react";
import styled from "styled-components";
import moment from "moment";
import _ from "lodash";
import ReactTooltip from "react-tooltip";

import TransactionSquare from "./TransactionSquare";

const Container = styled.div`
  background-color: #746fa0;
  width: 200px;
  height: 274px;
  display: flex;
  margin: 10px;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockNumber = styled.h5`
  font-size: 11px;
  color: #ffffff;
  margin: 0;
`;

const MinedAgo = styled.h5`
  font-size: 11px;
  color: #d9d8e5;
  margin: 0;
`;

const RightHeader = styled.div``;

const TransactionCount = styled.h5`
  font-size: 11px;
  color: #ffffff;
  margin: 0;
`;

const Grid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Square = styled.div`
  width: 14px;
  height: 14px;
  background-color: white;
  margin: 2px 2px;
`;

const MoreTransactionsButton = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px 10px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

export const BlockCard = ({ blockNumber, timestamp, transactions }) => {
  const chunksOfTen = _.chunk(transactions.slice(0, 100), 10);

  return (
    <Container>
      <Header>
        <LeftHeader>
          <BlockNumber>#{blockNumber}</BlockNumber>
          <MinedAgo>mined {moment(timestamp * 1000).fromNow()}</MinedAgo>
        </LeftHeader>
        <RightHeader>
          <TransactionCount>{transactions.length} TXs</TransactionCount>
        </RightHeader>
      </Header>
      <Grid>
        {chunksOfTen.map((chunk, i) => (
          <Row key={i}>
            {chunk.map(({ hash, from, to, value, input }) => (
              <TransactionSquare
                key={hash}
                hash={hash}
                from={from}
                to={to}
                value={value}
                input={input}
              />
            ))}
          </Row>
        ))}
      </Grid>
      <MoreTransactionsButton>
        <span>6 more TX</span>
        <span>></span>
      </MoreTransactionsButton>
      <ReactTooltip place="right" type="light" effect="solid" />
    </Container>
  );
};

export default BlockCard;
