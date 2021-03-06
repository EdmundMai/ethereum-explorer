import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../assets/styles/theme";

const Container = styled.div`
  background-color: ${({ theme }) => theme.header.background.color};
  display: flex;
  padding: 50px;
`;
const Statistic = styled.div`
  margin-right: 20px;
  min-width: 275px;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.header.title.color};
  font-size: 15px;
  margin-bottom: 10px;
  margin: 0;
  text-transform: uppercase;
  font-weight: 400;
`;

const Value = styled.div`
  color: ${({ theme }) => theme.header.value.color};
  letter-spacing: 1px;
  margin-top: 10px;
`;

const Amount = styled.span`
  font-size: 50px;
  font-weight: 300;
`;

const LoadingStrip = styled.div`
  background-color: ${({ theme }) => theme.header.loading.color};
  height: 60px;
  width: 235px;
`;

const Unit = styled.span`
  font-size: 20px;
  margin-left: 2px;
`;

export const Header = ({
  isLoading,
  currentBlock,
  averageGasPrice,
  averageBlockSize,
  averagaeBlockFullness,
}) => (
  <ThemeProvider theme={theme}>
    <Container>
      <Statistic>
        <Title>Current Block</Title>
        <Value>
          {isLoading ? <LoadingStrip /> : <Amount>{currentBlock}</Amount>}
        </Value>
      </Statistic>
      <Statistic>
        <Title>Average Gas Price</Title>
        <Value>
          {isLoading ? (
            <LoadingStrip />
          ) : (
            <React.Fragment>
              <Amount>{averageGasPrice}</Amount>
              <Unit>gwei</Unit>
            </React.Fragment>
          )}
        </Value>
      </Statistic>
      <Statistic>
        <Title>Average Block Size</Title>
        <Value>
          {isLoading ? (
            <LoadingStrip />
          ) : (
            <React.Fragment>
              <Amount>{averageBlockSize}</Amount>
              <Unit>mgas</Unit>
            </React.Fragment>
          )}
        </Value>
      </Statistic>
      <Statistic>
        <Title>Average Block Fullness</Title>
        <Value>
          {isLoading ? (
            <LoadingStrip />
          ) : (
            <Amount>{averagaeBlockFullness * 100}%</Amount>
          )}
        </Value>
      </Statistic>
    </Container>
  </ThemeProvider>
);

export default Header;
