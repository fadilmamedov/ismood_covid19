import React from 'react';
import styled from 'styled-components/macro';
import { Navbar as NavbarBase } from 'react-bootstrap';

const Navbar = styled(NavbarBase)`
  color: #5c7080;
  font-size: 14px;
  box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.2);
`;

const ExternalLink = styled.a.attrs({
  target: '_blank',
})`
  margin: 0 4px;
`;

const Footer = () => (
  <Navbar bg="light" fixed="bottom">
    Statistical data collected through
    <ExternalLink href="https://www.who.int/">WHO</ExternalLink> and
    <ExternalLink href="https://eody.gov.gr/en">NPHO</ExternalLink>
  </Navbar>
);

export { Footer };