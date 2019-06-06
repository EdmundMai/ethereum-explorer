import React, { useState, useEffect } from "react";
import styled from "styled-components";

import LOGO from "../../assets/images/logo.png";
import ICON_DASHBOARD from "../../assets/images/icon-dashboard.png";
import ICON_PROJECTS from "../../assets/images/icon-projects.png";
import ICON_EXPLORER from "../../assets/images/icon-explorer.png";
import ICON_SETTINGS from "../../assets/images/icon-settings.png";
import ICON_LOGOUT from "../../assets/images/icon-logout.png";

const Container = styled.nav`
  width: 75px;
  background: #6962aa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledLink = styled.a`
  color: #ffffff;
  flex-direction: column;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: ${props => (props.active ? "#564F96" : "none")};
`;

const SectionName = styled.span`
  color: #ffffff;
  font-size: 9px;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const NavigationSection = styled.div``;

const Navigation = () => (
  <Container>
    <NavigationSection>
      <StyledLink href="/">
        <Logo src={LOGO} />
      </StyledLink>
      <StyledLink href="/">
        <Icon src={ICON_DASHBOARD} />
        <SectionName>Dashboard</SectionName>
      </StyledLink>
      <StyledLink href="/">
        <Icon src={ICON_PROJECTS} />
        <SectionName>Projects</SectionName>
      </StyledLink>
      <StyledLink href="/" active>
        <Icon src={ICON_EXPLORER} />
        <SectionName>Explorer</SectionName>
      </StyledLink>
    </NavigationSection>
    <NavigationSection>
      <StyledLink href="/">
        <Icon src={ICON_SETTINGS} />
        <SectionName>Settings</SectionName>
      </StyledLink>
      <StyledLink href="/">
        <Icon src={ICON_LOGOUT} />
        <SectionName>Logout</SectionName>
      </StyledLink>
    </NavigationSection>
  </Container>
);

export default Navigation;
