import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Card } from 'react-bootstrap';

const CardBody = styled(Card.Body)`
  display: flex;
  justify-content: space-between;
`;

const ValueContainer = styled.div`
  ${props => props.muted && `
    color: #85909c;
  `}
`;

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

const AverageAgeInfoCard = ({ title, values }) => (
  <Card>
    <CardBody>
      <ValueContainer>
        <Title>Average age</Title>
        <Value>{values.all}</Value>
      </ValueContainer>

      <ValueContainer muted>
        <Title>Active cases</Title>
        <Value>{values.active}</Value>
      </ValueContainer>

      <ValueContainer muted>
        <Title>Recovered cases</Title>
        <Value>{values.recovered}</Value>
      </ValueContainer>

      <ValueContainer muted>
        <Title>Deaths</Title>
        <Value>{values.deaths}</Value>
      </ValueContainer>
    </CardBody>
  </Card>
);

AverageAgeInfoCard.propTypes = {
  title: types.string.isRequired,
  values: types.shape({
    all: types.number.isRequired,
    active: types.number.isRequired,
    recovered: types.number.isRequired,
    deaths: types.number.isRequired,
  }).isRequired,
};

export { AverageAgeInfoCard };
