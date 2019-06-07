import React from "react";
import styled from "styled-components";

export default styled.div`
  display: grid;
  flex: 1;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(10, minmax(1rem, 1fr));
  grid-template-rows: repeat(10, minmax(1rem, 1fr));
  padding: 15px;
`;
