import React from 'react';
import styled from 'styled-components/macro';
import { Bubble } from 'react-chartjs-2';

import { ChartCard as ChartCardBase } from 'Components/Common';

const ChartCard = styled(ChartCardBase)`
  height: 400px;
`;

const ChartCardBody = styled(ChartCard.Body)`
  height: 400px;
`;

const CasesPerDayBubbleChart = ({ newCasesPerDay, totalCasesPerDay }) => {
  const values = totalCasesPerDay.map((value, index) => ({
    ...value,
    r: newCasesPerDay[index].y / 5,
  }));

  const data = {
    datasets: [
      {
        type: 'bubble',
        label: 'New cases per day',
        data: values,
        backgroundColor: 'rgba(238, 118, 76, 0.8)',
      },
      {
        type: 'line',
        label: 'Total cases per day',
        data: totalCasesPerDay,
        pointRadius: 2,
        pointBackgroundColor: '#5c7080',
      },
    ]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
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
      line: {
        tension: 0,
        borderWidth: 1.5,
        borderColor: '#5c7080',
      }
    },
  };

  return (
    <ChartCard title="New / total cases per day">
      <ChartCardBody>
        <Bubble
          data={data}
          options={options}
        />
      </ChartCardBody>
    </ChartCard>
  )
}

export { CasesPerDayBubbleChart };
