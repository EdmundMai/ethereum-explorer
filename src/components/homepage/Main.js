import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Navigation from "../shared/Navigation";
import Header from "./Header";
import BlockGrid from "./BlockGrid";

import InfuraAPI from "../../services/infura-api";
import { hexToNumber } from "../../helpers";

const Container = styled.div`
  display: flex;
`;

const Explorer = styled.div`
  width: 100%;
  background-color: #494389;
`;

const Footer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadMoreButton = styled.button`
  border: 1px solid #827DAD;
  outline: none;
  border-radius: 20px;
  padding: 10px 40px;
  color: #ffffff;
  font-size: 14px;
  background-color: #726da3;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
`;

export const Main = ({
  blocks,
  fetchBlockRange,
  averageGasPrice,
  averageBlockFullness,
  averageBlockSize,
}) => {
  const [latestBlockNumber, setLatestBlockNumber] = useState(0);

  useEffect(() => {
    InfuraAPI.getLatestBlockNumber().then(({ data: { result } }) => {
      const blockNumber = hexToNumber(result);
      setLatestBlockNumber(blockNumber);

      fetchBlockRange({
        startingBlockNumber: blockNumber,
        endingBlockNumber: blockNumber - 1,
      });
    });
  }, []);

  return (
    <Container>
      <Navigation />
      <Explorer>
        <Header
          currentBlock={latestBlockNumber.toLocaleString()}
          averageGasPrice={averageGasPrice}
          averageBlockSize={averageBlockSize}
          averagaeBlockFullness={averageBlockFullness}
        />
        <BlockGrid blocks={blocks} />
        <Footer>
          <LoadMoreButton
            onClick={() => {
              const { number: oldestBlockNumber } = blocks[blocks.length - 1];
              fetchBlockRange({
                startingBlockNumber: oldestBlockNumber - 1,
                endingBlockNumber: oldestBlockNumber - 4,
              });
            }}>
            Load More
          </LoadMoreButton>
        </Footer>
      </Explorer>
    </Container>
  );
};

export default Main;
