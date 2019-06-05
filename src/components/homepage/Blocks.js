import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #494389;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Block = styled.div`
  background-color: #746fa0;
  width: 200px;
  height: 274px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const LeftHeading = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockNumber = styled.h5`
  font-size: 13px;
  color: #ffffff;
  margin: 0;
`;

const MinedAgo = styled.h5`
  font-size: 13px;
  color: #d9d8e5;
  margin: 0;
`;

const RightHeading = styled.div``;

const TransactionAmount = styled.h5`
  font-size: 13px;
  color: #ffffff;
  margin: 0;
`;

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 10px;
  grid-row-gap: 10px;
  padding: 10px;
`;

const Square = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
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

export const Blocks = () => (
  <Container>
    <Row>
      <Block>
        <Heading>
          <LeftHeading>
            <BlockNumber>#8,123,123</BlockNumber>
            <MinedAgo>mined 32s ago</MinedAgo>
          </LeftHeading>
          <RightHeading>
            <TransactionAmount>82 TXs</TransactionAmount>
          </RightHeading>
        </Heading>
        <Grid>
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </Grid>
        <MoreTransactionsButton>
          <span>6 more TX</span>
          <span>></span>
        </MoreTransactionsButton>
      </Block>
      <Block>Current Block</Block>
      <Block>Current Block</Block>
      <Block>Current Block</Block>
    </Row>
    <Row>
      <Block>Current Block</Block>
      <Block>Current Block</Block>
    </Row>
  </Container>
);

export default Blocks;
