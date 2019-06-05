import React from "react";
import styled from "styled-components";

import BlockCard from "./BlockCard";

const Container = styled.div`
  padding: 20px;
  background-color: #494389;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Blocks = () => (
  <Container>
    <Row>
      <BlockCard
        blockNumber={8123123}
        minedAt={"32 seconds ago"}
        transactions={[1, 2, 3, 4, 5]}
      />
      <BlockCard
        blockNumber={8123123}
        minedAt={"32 seconds ago"}
        transactions={[1, 2, 3, 4, 5]}
      />
      <BlockCard
        blockNumber={8123123}
        minedAt={"32 seconds ago"}
        transactions={[1, 2, 3, 4, 5]}
      />
      <BlockCard
        blockNumber={8123123}
        minedAt={"32 seconds ago"}
        transactions={[1, 2, 3, 4, 5]}
      />
    </Row>
    <Row>
      <BlockCard
        blockNumber={8123123}
        minedAt={"32 seconds ago"}
        transactions={[1, 2, 3, 4, 5]}
      />
      <BlockCard
        blockNumber={8123123}
        minedAt={"32 seconds ago"}
        transactions={[1, 2, 3, 4, 5]}
      />
      <BlockCard
        blockNumber={8123123}
        minedAt={"32 seconds ago"}
        transactions={[1, 2, 3, 4, 5]}
      />
    </Row>
  </Container>
);

export default Blocks;
