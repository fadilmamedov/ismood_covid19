import React from 'react';
import styled from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { ChartCard as ChartCardBase } from 'Components/Common';

const ChartCard = styled(ChartCardBase)`
  height: 400px;
`;

const NewCasesPerDayChart = () => {
  const data = {
    datasets: [{
      data: [
        { x: '2016-12-25', y: 220 },
        { x: '2016-12-26', y: 120 },
        { x: '2016-12-27', y: 300 },
      ],
      backgroundColor: '#66a4fc'
    }]
  };

  const options = {
    legend: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        }
      }],
      yAxes: [{
        type: 'linear',
      }],
    }
  };

  return (
    <ChartCard title="New cases per day">
      <ChartCard.Body>
        <Bar
          data={data}
          height="100%"
          options={options}
        />
      </ChartCard.Body>
    </ChartCard>
  )
}

export { NewCasesPerDayChart };
