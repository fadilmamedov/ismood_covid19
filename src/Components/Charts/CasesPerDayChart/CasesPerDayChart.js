import React from 'react';
import styled from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { ChartCard as ChartCardBase } from 'Components/Common';

const ChartCard = styled(ChartCardBase)`
  height: 400px;
`;

const CasesPerDayChart = ({ newCasesPerDay, totalCasesPerDay }) => {
  const data = {
    datasets: [
      {
        label: 'newCasesPerDay',
        data: newCasesPerDay,
        backgroundColor: '#ee774c'
      },
      {
        label: 'totalCasesPerDay',
        data: totalCasesPerDay,
        type: 'line'
      }
    ]
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
        gridLines: {
          color: '#f1f4f7'
        }
      }],
      yAxes: [{
        type: 'linear',
        ticks: {
          suggestedMin: 0,
        },
        gridLines: {
          color: '#f1f4f7'
        }
      }],
    },
    elements: {
      point:{
        radius: 3,
        backgroundColor: '#5c7080',
      },
      line: {
        tension: 0,
        borderWidth: 1.5,
        borderColor: '#5c7080',
      }
    },
  };

  return (
    <ChartCard title="New cases per day / Total cases per day">
      <ChartCard.Body>
        <Bar
          data={data}
          options={options}
        />
      </ChartCard.Body>
    </ChartCard>
  )
}

export { CasesPerDayChart };
