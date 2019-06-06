import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px;
  background-color: #433d7b;
  display: flex;
`;
const Statistic = styled.div`
  margin-right: 20px;
  min-width: 275px;
`;

const Title = styled.h4`
  text-transform: uppercase;
  font-size: 15px;
  color: #9f9cbd;
  margin: 0;
  margin-bottom: 10px;
`;

const Value = styled.div`
  color: #ffffff;
  letter-spacing: 1px;
`;

const Amount = styled.span`
  font-size: 45px;
`;

const Unit = styled.span`
  font-size: 20px;
  margin-left: 2px;
`;

export const Header = ({
  currentBlock,
  averageGasPrice,
  averageBlockSize,
  averagaeBlockFullness,
}) => (
  <Container>
    <Statistic>
      <Title>Current Block</Title>
      <Value>
        <Amount>{currentBlock}</Amount>
      </Value>
    </Statistic>
    <Statistic>
      <Title>Average Gas Price</Title>
      <Value>
        <Amount>{averageGasPrice}</Amount>
        <Unit>gwei</Unit>
      </Value>
    </Statistic>
    <Statistic>
      <Title>Average Block Size</Title>
      <Value>
        <Amount>{averageBlockSize}</Amount>
        <Unit>mgas</Unit>
      </Value>
    </Statistic>
    <Statistic>
      <Title>Average Block Fullness</Title>
      <Value>
        <Amount>{averagaeBlockFullness * 100}%</Amount>
      </Value>
    </Statistic>
  </Container>
);

export default Header;
