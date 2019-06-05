import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Blocks from "./Blocks";

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

export const Main = () => {
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
          currentBlock={123123123}
          averageGasPrice={87}
          averageBlockSize={8.2}
          averagaeBlockFullness={0.88}
        />
        <Blocks />
      </Explorer>
    </Container>
  );
};

export default Main;
