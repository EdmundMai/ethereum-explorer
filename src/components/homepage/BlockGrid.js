import React from "react";
import styled from "styled-components";

import BlockCard from "./BlockCard";

const Container = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(4, minmax(1rem, 1fr));
  grid-row-gap: 1em;
`;

export const BlockGrid = ({ blocks }) => {
  return (
    <Container>
      {blocks.map(({ number, transactions, timestamp, gasLimit }) => (
        <BlockCard
          key={number}
          blockNumber={number}
          timestamp={timestamp}
          transactions={transactions}
          gasLimit={gasLimit}
        />
      ))}
    </Container>
  );
};

export default BlockGrid;
