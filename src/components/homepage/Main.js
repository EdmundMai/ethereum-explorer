import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Header from "./Header";
import BlockGrid from "./BlockGrid";

import InfuraAPI from "../../services/infura-api";
import { hexToNumber } from "../../helpers";

const Container = styled.div`
  display: flex;
`;

const Navigation = styled.nav`
  width: 75px;
  background: #6962aa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Explorer = styled.div``;

const StyledLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 9px;
`;

const NavigationSection = styled.div``;

export const Main = ({
  blocks,
  fetchBlockRange,
  averageGasPrice,
  averageBlockFullness,
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
      <Navigation>
        <NavigationSection>
          <StyledLink href="/">Dashboard</StyledLink>
          <StyledLink href="/">Projects</StyledLink>
          <StyledLink href="/">Explorer</StyledLink>
        </NavigationSection>
        <NavigationSection>
          <StyledLink href="/">Settings</StyledLink>
          <StyledLink href="/">Logout</StyledLink>
        </NavigationSection>
      </Navigation>
      <Explorer>
        <Header
          currentBlock={latestBlockNumber}
          averageGasPrice={averageGasPrice}
          averageBlockSize={8.2}
          averagaeBlockFullness={averageBlockFullness}
        />
        <BlockGrid blocks={blocks} />
      </Explorer>
    </Container>
  );
};

export default Main;
