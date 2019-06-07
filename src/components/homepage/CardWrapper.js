import styled from "styled-components";

export default styled.div`
  background-color: ${({ theme }) =>
    theme ? "#746fa0" : theme.blockCard.background.color};
  box-shadow: 2px 2px 30px -13px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  height: 370px;
  margin: 10px;
  width: 274px;
`;
