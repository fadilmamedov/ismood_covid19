import React from 'react';
import styled from 'styled-components/macro';
import { Bar, Line } from 'react-chartjs-2';

import { ChartCard as ChartCardBase } from 'Components/Common';
import { CasesPerDayChartHeader } from './CasesPerDayChart.Header';

const ChartCard = styled(ChartCardBase)`
  height: 400px;
`;

const ChartCardBody = styled(ChartCard.Body)`
  height: 400px;
`;

const CasesPerDayChart = ({ newCasesPerDay, totalCasesPerDay }) => {
  const [selectedChart, setSelectedChart] = React.useState('new-cases-per-day');

  const scrollPosition = window.scrollY;
  React.useEffect(() => {
    window.scrollTo(0, scrollPosition);
  });

  const newCasesPerDayData = {
    datasets: [{
      data: newCasesPerDay,
      backgroundColor: '#ee774c'
    }]
  };

  const totalCasesPerDayData = {
    datasets: [{
      data: totalCasesPerDay,
    }]
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

  const title = (
    <CasesPerDayChartHeader
      selectedChart={selectedChart}
      onSelectChart={(chart) => {
        setSelectedChart(chart);
      }}
    />
  );

  return (
    <ChartCard title={title}>
      <ChartCardBody>
        {selectedChart === 'new-cases-per-day' && (
          <Bar
            data={newCasesPerDayData}
            options={options}
          />
        )}

        {selectedChart === 'total-cases-per-day' && (
          <Line
            data={totalCasesPerDayData}
            options={options}
          />
        )}
      </ChartCardBody>
    </ChartCard>
  )
}

export { CasesPerDayChart };
