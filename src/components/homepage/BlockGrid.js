import React from "react";
import styled from "styled-components";
import _ from "lodash";

import BlockCard from "./BlockCard";

const Container = styled.div`
  padding: 20px;
  background-color: #494389;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const BlockGrid = ({ blocks }) => {
  const chunksOfFour = _.chunk(blocks, 4);

  return (
    <Container>
      {chunksOfFour.map(chunk => (
        <Row>
          {chunk.map(({ number, transactions, timestamp }) => (
            <BlockCard
              blockNumber={number}
              timestamp={timestamp}
              transactions={transactions}
            />
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default BlockGrid;