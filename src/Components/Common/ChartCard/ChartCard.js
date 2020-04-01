import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Card } from 'react-bootstrap';

const Title = styled(Card.Header)`
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  font-family: Rubik;
  text-transform: uppercase;
`;

const ChartCard = ({ title, children, height, className }) => (
  <Card className={className}>
    {title && (
      <Title>{title}</Title>
    )}

    {children}
  </Card>
);

ChartCard.propTypes = {
  title: types.node.isRequired,
  children: types.node.isRequired,
  className: types.string,
}

ChartCard.Body = styled(Card.Body)`
  position: relative;
`;

ChartCard.Footer = styled(Card.Footer)`
  background-color: transparent;
`;

export { ChartCard };
