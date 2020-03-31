import React from 'react';
import styled from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { ChartCard as ChartCardBase } from 'Components/Common';

const ChartCard = styled(ChartCardBase)`
  height: 400px;
`;

const NewCasesPerDayChart = ({ values }) => {
  const data = {
    datasets: [{
      data: values,
      backgroundColor: '#ee774c'
    }]
  };

  const options = {
    legend: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        offset: true,
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
          options={options}
        />
      </ChartCard.Body>
    </ChartCard>
  )
}

export { NewCasesPerDayChart };
