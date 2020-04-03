import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Container} from 'react-bootstrap';

import { selectors } from 'Store';
import * as translations from 'Assets/Translations';

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: normal;

  @media screen and (max-width: 575px) {
    font-size: 18px;
  }
`;

const BackButton = styled(Link)`
  margin-left: auto;
  color: black;
  text-decoration: underline;

  @media screen and (max-width: 575px) {
    font-size: 12px;
  }
`;

const PageContainerBase = ({ language, title, children }) => {
  const { BackToMainPageLink } = translations[language];

  return (
    <Container>
      <Header>
        <Title>{title}</Title>

        <BackButton to="/">
          {BackToMainPageLink}
        </BackButton>
      </Header>

      {children}
    </Container>
  );
};

PageContainerBase.propTypes = {
  language: types.string.isRequired,
  title: types.string.isRequired,
  children: types.node.isRequired,
};

const {
  getLanguage,
} = selectors.app;

const PageContainer = r.compose(
  connect(
    r.applySpec({
      language: getLanguage,
    })
  )
)(PageContainerBase);

export { PageContainer };
