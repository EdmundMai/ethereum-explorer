import React, { useEffect } from "react";
import { connect } from "react-redux";

import Main from "./Main";

export const Homepage = () => <Main />;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
