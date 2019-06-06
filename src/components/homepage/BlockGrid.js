import React from "react";
import styled from "styled-components";
import _ from "lodash";

import BlockCard from "./BlockCard";

const Container = styled.div`
  padding: 50px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const BlockGrid = ({ blocks }) => {
  const chunksOfFour = _.chunk(blocks, 4);

  return (
    <Container>
      {chunksOfFour.map((chunk, i) => (
        <Row key={i}>
          {chunk.map(({ number, transactions, timestamp, gasLimit }) => (
            <BlockCard
              key={number}
              blockNumber={number}
              timestamp={timestamp}
              transactions={transactions}
              gasLimit={gasLimit}
            />
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default BlockGrid;
