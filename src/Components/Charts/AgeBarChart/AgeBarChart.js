import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { ChartCard } from 'Components/Common';

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartCardBody = styled(ChartCard.Body)`
  height: 300px;

  @media screen and (min-width: 767px) {
    height: 200px;
  }
`;

const AgeBarChart = ({ ageGroups, averageAge }) => {
  const data = {
    labels: r.keys(ageGroups),
    datasets: [{
      data: r.values(ageGroups),
      backgroundColor: '#ee774c'
    }]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
  };

  const title = (
    <Title>
      <span>Age</span>

      <span>Average age: {averageAge.toFixed(1)}</span>
    </Title>
  );

  return (
    <ChartCard title={title}>
      <ChartCardBody>
        <Bar
          data={data}
          options={options}
        />
      </ChartCardBody>
    </ChartCard>
  )
};

AgeBarChart.propTypes = {
  ageGroups: types.objectOf(types.number).isRequired,
  averageAge: types.number.isRequired,
};

export { AgeBarChart };
