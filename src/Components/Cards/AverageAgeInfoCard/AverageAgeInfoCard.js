import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Card, Container, Row, Col } from 'react-bootstrap';

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
  text-align: center;
  text-transform: uppercase;
`;

const Value = styled.h3`
  margin-bottom: 0;
  font-weight: normal;
  font-family: Rubik;
  text-align: center;
`;

const AverageAgeInfoCard = ({ title, values }) => (
  <Card>
    <CardBody>
      <Container>
        <Row>
          <Col xs={3}>
            <ValueContainer>
              <Title>Average age</Title>
              <Value>{values.all}</Value>
            </ValueContainer>
          </Col>

          <Col xs={3}>
            <ValueContainer muted>
              <Title>Active cases</Title>
              <Value>{values.active}</Value>
            </ValueContainer>
          </Col>

          <Col xs={3}>
            <ValueContainer muted>
              <Title>Recovered cases</Title>
              <Value>{values.recovered}</Value>
            </ValueContainer>
          </Col>

          <Col xs={3}>
            <ValueContainer muted>
              <Title>Death cases</Title>
              <Value>{values.deaths}</Value>
            </ValueContainer>
          </Col>
        </Row>
      </Container>
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
