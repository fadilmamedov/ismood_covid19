import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Card } from 'react-bootstrap';

const Title = styled.h6`
  margin: 0;
  margin-bottom: 7px;
  font-size: 11px;
  font-weight: 500;
  font-family: Rubik;
  text-transform: uppercase;
`;

const Value = styled.h3`
  margin-bottom: 0;
  font-weight: normal;
  font-family: Rubik;
`;

const Description = styled.div`
  margin-left: 5px;
  margin-bottom: 2px;
  font-size: 12px;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const InfoCard = ({ title, value, description }) => (
  <Card>
    <Card.Body>
      <Title>
        {title}
      </Title>

      <InnerContainer>
        <Value>
          {value}
        </Value>

        <Description>
          {description}
        </Description>
      </InnerContainer>
    </Card.Body>
  </Card>
);

InfoCard.propTypes = {
  title: types.string.isRequired,
  value: types.number.isRequired,
  description: types.node,
}

export { InfoCard };
