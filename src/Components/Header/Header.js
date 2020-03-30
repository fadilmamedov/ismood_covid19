import React from 'react';
import styled from 'styled-components/macro';
import { Navbar as NavbarBase } from 'react-bootstrap';

import LogoImage from 'Assets/Images/Logo.png';
import LogoImageSmall from 'Assets/Images/LogoSmall.png';

const Navbar = styled(NavbarBase)`
  box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.2);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img.attrs(({ small }) => ({
  src: small ? LogoImageSmall : LogoImage,
  alt: 'isMood'
}))`
  height: 50px;
`;

const Title = styled.p`
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 0;
  font-size: 22px;
`;

const Header = () => (
  <Navbar bg="light" fixed="top">
    <TitleContainer>
      <a href="https://www.ismood.com/">
        <Logo className="d-none d-sm-block" />
        <Logo small className="d-block d-sm-none" />
      </a>

      <Title>
        covid<span style={{ color: '#c34343' }}>19</span> Greece
      </Title>
    </TitleContainer>
</Navbar>
);

export { Header };
