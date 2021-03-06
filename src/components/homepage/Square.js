import styled from "styled-components";

export default styled.a`
  background-color: ${({ theme }) =>
    theme ? "#ffffff" : theme.square.background.color};
  display: inline-block;
  height: 14px;
  margin: 1px 2px;
  opacity: ${props =>
    props.opacity > 1 ? 1 : Math.max(props.opacity, 0.1) / 1.0};
  width: 14px;
`;
