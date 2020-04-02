import React from 'react';
import * as r from 'ramda';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Bubble } from 'react-chartjs-2';

import { selectors } from 'Store';
import * as translations from 'Assets/Translations';

import { ChartCard as ChartCardBase } from 'Components/Common';

const ChartCard = styled(ChartCardBase)`
  height: 400px;
`;

const ChartCardBody = styled(ChartCard.Body)`
  height: 400px;
`;

const CasesPerDayBubbleChartBase = ({
  language,
  newCasesPerDay,
  totalCasesPerDay,
}) => {
  const Strings = translations[language];

  const values = totalCasesPerDay.map((value, index) => ({
    ...value,
    r: newCasesPerDay[index].y / 5,
  }));

  const data = {
    datasets: [
      {
        type: 'bubble',
        label: Strings.Charts.NewTotalCasesPerDay.NewCasesLabel,
        data: values,
        backgroundColor: 'rgba(238, 118, 76, 0.8)',
      },
      {
        type: 'line',
        label: Strings.Charts.NewTotalCasesPerDay.TotalCasesLabel,
        data: totalCasesPerDay,
        pointRadius: 0,
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
    <ChartCard title={Strings.Charts.NewTotalCasesPerDay.Title}>
      <ChartCardBody>
        <Bubble
          data={data}
          options={options}
        />
      </ChartCardBody>
    </ChartCard>
  )
};

const {
  getLanguage,
} = selectors.app;

const CasesPerDayBubbleChart = r.compose(
  connect(
    r.applySpec({
      language: getLanguage,
    })
  )
)(CasesPerDayBubbleChartBase);

export { CasesPerDayBubbleChart };
