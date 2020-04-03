import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Navbar as NavbarBase } from 'react-bootstrap';

import { actions, selectors } from 'Store';
import * as translations from 'Assets/Translations';

import LogoImage from 'Assets/Images/Logo.png';

const Navbar = styled(NavbarBase)`
  display: flex;
  box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.2);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img.attrs(({ small }) => ({
  src: LogoImage,
  alt: 'isMood'
}))`
  height: 50px;
`;

const Title = styled.p`
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 0;
  font-size: 22px;

  @media screen and (max-width: 575px) {
    font-size: 14px;
  }
`;

const CountryName = styled.span`
  margin-left: 5px;
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 12px;
`;

const LanguageButton = styled.button`
  border: 0;
  border-radius: 3px;
  background: transparent;

  && {
    outline: 0;
  }

  ${props => props.selected && `
    color: white;
    background-color: #f1763c;
  `}

  ${props => props.selected === false && `
    &:last-child {
      padding-left: 0;
    }

    &:first-child {
      padding-right: 0;
    }
  `}
`;

const LanguageDivider = styled.span`
  margin: 0 5px;
`;

const HeaderBase = ({ language, setLanguage }) => {
  const Strings = translations[language];

  return (
    <Navbar bg="light" fixed="top" className="header">
      <TitleContainer>
        <a href="https://www.ismood.com/">
          <Logo />
        </a>

        <Title>
          covid<span style={{ color: '#c34343' }}>19</span>
          <CountryName>
            {Strings.Header.CountryName}
          </CountryName>
        </Title>
      </TitleContainer>

      <LanguageSelector>
        <LanguageButton selected={language === 'gr'} onClick={() => setLanguage('gr')}>
          GR
        </LanguageButton>

        <LanguageDivider>|</LanguageDivider>

        <LanguageButton selected={language === 'en'} onClick={() => setLanguage('en')}>
          EN
        </LanguageButton>
      </LanguageSelector>
    </Navbar>
  )
};

HeaderBase.propTypes = {
  language: types.string.isRequired,
  setLanguage: types.func.isRequired,
};

const {
  setLanguage,
} = actions.app;

const {
  getLanguage,
} = selectors.app;

const Header = r.compose(
  connect(
    r.applySpec({
      language: getLanguage,
    }),
    {
      setLanguage,
    }
  )
)(HeaderBase);

export { Header };
