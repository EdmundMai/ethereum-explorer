import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Navigation from "../shared/Navigation";
import Header from "./Header";
import BlockGrid from "./BlockGrid";

import InfuraAPI from "../../services/infura-api";
import { hexToNumber } from "../../helpers";
import { DEFAULT_BLOCKS_SHOWN, BLOCKS_PER_LOAD } from "../../config";

const Container = styled.div`
  display: flex;
`;

const Explorer = styled.div`
  background-color: #494389;
  width: 100%;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 0 150px 0;
`;

const LoadMoreButton = styled.button`
  background-color: #726da3;
  border-radius: 20px;
  border: 1px solid #827dad;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  outline: none;
  padding: 10px 40px;
  text-transform: uppercase;

  &:disabled {
    opacity: 0.2;
  }
`;

export const Main = ({
  blocks,
  numberOfBlocksToDisplay,
  isLoading,
  fetchBlockRange,
  averageGasPrice,
  averageBlockFullness,
  averageBlockSize,
}) => {
  const [latestBlockNumber, setLatestBlockNumber] = useState(0);

  useEffect(
    () => {
      InfuraAPI.getLatestBlockNumber().then(({ data: { result } }) => {
        const blockNumber = hexToNumber(result);
        setLatestBlockNumber(blockNumber);

        fetchBlockRange({
          startingBlockNumber: blockNumber,
          endingBlockNumber: blockNumber - DEFAULT_BLOCKS_SHOWN,
        });
      });
    },
    [fetchBlockRange]
  );

  return (
    <Container>
      <Navigation />
      <Explorer>
        <Header
          isLoading={isLoading}
          currentBlock={latestBlockNumber.toLocaleString()}
          averageGasPrice={averageGasPrice}
          averageBlockSize={averageBlockSize}
          averagaeBlockFullness={averageBlockFullness}
        />
        <BlockGrid
          blocks={blocks}
          numberOfBlocksToDisplay={numberOfBlocksToDisplay}
          isLoading={isLoading}
        />
        <Footer>
          <LoadMoreButton
            disabled={isLoading}
            onClick={() => {
              const { number: oldestBlockNumber } = blocks[blocks.length - 1];
              fetchBlockRange({
                startingBlockNumber: oldestBlockNumber - 1,
                endingBlockNumber: oldestBlockNumber - (BLOCKS_PER_LOAD + 1),
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
