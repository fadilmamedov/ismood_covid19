import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
`;

const HeaderTab = styled.button`
  width: 100%;
  padding: 10px 20px;
  border: 0;
  border-radius: 3px;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;

  && {
    outline: 0;
  }

  ${props => props.selected && `
    background-color: #edf2f5;
  `}

  &:hover {
    background-color: #edf2f5;
  }

  &:last-child {
    margin-left: 20px;
  }
`;

const CasesPerDayChartHeader = ({ selectedChart, onSelectChart }) => (
  <Container>
    <HeaderTab
      selected={selectedChart === 'new-cases-per-day'}
      onClick={() => onSelectChart('new-cases-per-day')}
    >
      New cases per day
    </HeaderTab>

    <HeaderTab
      selected={selectedChart === 'total-cases-per-day'}
      onClick={() => onSelectChart('total-cases-per-day')}
    >
      Total cases per day
    </HeaderTab>
  </Container>
);

CasesPerDayChartHeader.propTypes = {
  selectedChart: types.string.isRequired,
  onSelectChart: types.func.isRequired,
};

export { CasesPerDayChartHeader };
