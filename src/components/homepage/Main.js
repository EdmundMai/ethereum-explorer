import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../assets/styles/theme";

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
  background-color: ${({ theme }) => theme.body.background.color};
  width: 100%;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 0 150px 0;
`;

const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.blockCard.background.color};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.loadingButton.border.color};
  color: ${({ theme }) => theme.body.primary.color};
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
          startingBlockNumber: blockNumber - DEFAULT_BLOCKS_SHOWN,
          endingBlockNumber: blockNumber,
        });
      });
    },
    [fetchBlockRange]
  );

  return (
    <ThemeProvider theme={theme}>
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
                  startingBlockNumber:
                    oldestBlockNumber - (BLOCKS_PER_LOAD + 1),
                  endingBlockNumber: oldestBlockNumber - 1,
                });
              }}>
              Load More
            </LoadMoreButton>
          </Footer>
        </Explorer>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
