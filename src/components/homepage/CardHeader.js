import React from "react";
import styled from "styled-components";
import moment from "moment";

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    ss: "%ss",
    m: "1m",
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  height: 40px;
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
  margin: 0;
`;

const RightHeader = styled.div``;

const TransactionCount = styled.h5`
  color: #ffffff;
  font-size: 15px;
  letter-spacing: 2px;
  margin: 0;
  white-space: nowrap;
`;

const LoadingStrip = styled.div`
  background-color: #837fab;
  height: 10px;
  margin-bottom: 5px;
  width: ${props => (props.width ? `${props.width}px` : "50px")};
`;

const CardHeader = ({
  isLoading,
  blockNumber,
  timestamp,
  transactionCount,
}) => (
  <Container>
    <LeftHeader>
      {isLoading ? (
        <React.Fragment>
          <LoadingStrip width={80} />
          <LoadingStrip width={60} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <BlockNumber>#{blockNumber.toLocaleString()}</BlockNumber>
          <MinedAgo>mined {moment(timestamp * 1000).fromNow()}</MinedAgo>
        </React.Fragment>
      )}
    </LeftHeader>
    <RightHeader>
      {isLoading ? (
        <LoadingStrip width={40} />
      ) : (
        <TransactionCount>
          {transactionCount}
          {"  "}TXs
        </TransactionCount>
      )}
    </RightHeader>
  </Container>
);

export default CardHeader;
