import React from "react";
import styled from "styled-components";

import LOGO from "../../assets/images/logo.png";
import ICON_DASHBOARD from "../../assets/images/icon-dashboard.png";
import ICON_PROJECTS from "../../assets/images/icon-projects.png";
import ICON_EXPLORER from "../../assets/images/icon-explorer.png";
import ICON_SETTINGS from "../../assets/images/icon-settings.png";
import ICON_LOGOUT from "../../assets/images/icon-logout.png";

const Container = styled.nav`
  background: #6962aa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
`;

const StyledLink = styled.a`
  align-items: center;
  background-color: ${props => (props.active ? "#564F96" : "none")};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  text-decoration: none;
`;

const SectionName = styled.span`
  color: #ffffff;
  font-size: 12px;
  margin-top: 5px;
  text-transform: uppercase;
`;

const Logo = styled.img`
  height: 50px;
  object-fit: contain;
  width: 50px;
`;

const Icon = styled.img`
  height: 25px;
  object-fit: contain;
  width: 25px;
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
