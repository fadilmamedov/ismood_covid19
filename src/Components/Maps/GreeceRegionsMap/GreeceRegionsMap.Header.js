import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span``;

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  padding: 0 5px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.2), red);
`;

const LegendItem = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

const GreeceRegionsMapHeader = ({ title, maxCasesCount }) => (
  <Container>
    <Title>
      {title}
    </Title>

    <Legend>
      <LegendItem>0</LegendItem>
      <LegendItem>{maxCasesCount}</LegendItem>
    </Legend>
  </Container>
);

GreeceRegionsMapHeader.propTypes = {
  title: types.string.isRequired,
  maxCasesCount: types.number.isRequired,
};

export { GreeceRegionsMapHeader };
