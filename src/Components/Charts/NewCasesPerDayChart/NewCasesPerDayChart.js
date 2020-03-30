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
        { x: '2020-03-30', y: 43 },
        { x: '2020-03-29', y: 37 },
        { x: '2020-03-28', y: 32 },
        { x: '2020-03-27', y: 37 },
        { x: '2020-03-26', y: 18 },
        { x: '2020-03-25', y: 22 },
        { x: '2020-03-24', y: 20 },
        { x: '2020-03-23', y: 15 },
        { x: '2020-03-22', y: 10 },
        { x: '2020-03-21', y: 8 },
        { x: '2020-03-20', y: 9 },
        { x: '2020-03-19', y: 7 },
        { x: '2020-03-18', y: 7 },
        { x: '2020-03-17', y: 3 },
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
        },
      }],
      yAxes: [{
        type: 'linear',
        ticks: {
          suggestedMin: 0,
        }
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
