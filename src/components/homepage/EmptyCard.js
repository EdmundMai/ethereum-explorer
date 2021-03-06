import React from "react";
import _ from "lodash";

import CardWrapper from "./CardWrapper";
import CardHeader from "./CardHeader";
import CardGrid from "./CardGrid";
import Square from "./Square";

const EmptyCard = () => (
  <CardWrapper>
    <CardHeader isLoading={true} />
    <CardGrid>
      {_.range(0, 25).map(i => <Square key={i} opacity={0.2} />)}
    </CardGrid>
  </CardWrapper>
);

export default EmptyCard;
