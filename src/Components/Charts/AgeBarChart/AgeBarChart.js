import React from 'react';
import * as r from 'ramda';
import styled from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { ChartCard } from 'Components/Common';

const ChartCardBody = styled(ChartCard.Body)`
  height: 300px;

  @media screen and (min-width: 767px) {
    height: 200px;
  }
`;

const AgeBarChart = ({ ageGroups }) => {
  console.log('[user]', { ageGroups });

  const data = {
    labels: r.keys(ageGroups),
    datasets: [{
      data: r.values(ageGroups),
      backgroundColor: '#66a4fc'
    }]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <ChartCard title="Age">
      <ChartCardBody>
        <Bar
          data={data}
          options={options}
        />
      </ChartCardBody>
    </ChartCard>
  )
}

export { AgeBarChart };
