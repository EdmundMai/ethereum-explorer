import React, { useState } from "react";
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
  const [activeBlockNumber, setActiveBlockNumber] = useState(null);
  const chunksOfFour = _.chunk(blocks, 4);

  return (
    <Container>
      {chunksOfFour.map((chunk, i) => (
        <Row key={i}>
          {chunk.map(({ number, transactions, timestamp }) => (
            <BlockCard
              onMouseEnter={() => setActiveBlockNumber(number)}
              key={number}
              isActive={activeBlockNumber === number || !activeBlockNumber}
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
