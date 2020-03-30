import React from 'react';
import styled from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { ChartCard } from 'Components/Common';

const ChartCardBody = styled(ChartCard.Body)`
  height: 300px;

  @media screen and (min-width: 767px) {
    height: 200px;
  }
`;

const AgeBarChart = () => {
  const data = {
    labels: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90'],
    datasets: [{
      data: [17, 20, 22, 45, 89, 91, 78, 98, 120],
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
