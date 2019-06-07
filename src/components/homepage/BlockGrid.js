import React from "react";
import styled from "styled-components";
import _ from "lodash";

import BlockCard from "./BlockCard";
import EmptyCard from "./EmptyCard";

const Container = styled.div`
  display: grid;
  grid-row-gap: 1em;
  grid-template-columns: repeat(4, minmax(1rem, 1fr));
  padding: 50px;
`;

export const BlockGrid = ({ blocks, numberOfBlocksToDisplay, isLoading }) => {
  // const loadingBlocksCount = Math.ceil(
  // numberOfBlocksToDisplay - blocks.length,
  // 0
  // );
  return (
    <Container>
      {!isLoading &&
        blocks.map(({ number, transactions, timestamp, isLoading }) => (
          <BlockCard
            key={number}
            blockNumber={number}
            timestamp={timestamp}
            transactions={transactions}
          />
        ))}
      {isLoading &&
        _.range(0, numberOfBlocksToDisplay).map(i => <EmptyCard key={i} />)}
    </Container>
  );
};

export default BlockGrid;
