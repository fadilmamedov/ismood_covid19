import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Container} from 'react-bootstrap';

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: normal;
  font-family: Rubik;
`;

const BackButton = styled(Link)`
  margin-left: auto;
  color: black;
  text-decoration: underline;
`;

const PageContainer = ({ title, children }) => (
  <Container>
    <Header>
      <Title>{title}</Title>

      <BackButton to="/">
        Go to main page
      </BackButton>
    </Header>

    {children}
  </Container>
);

PageContainer.propTypes = {
  title: types.string.isRequired,
  children: types.node.isRequired,
};

export { PageContainer };
