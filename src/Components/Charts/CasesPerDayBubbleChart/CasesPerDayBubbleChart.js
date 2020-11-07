import React from 'react';
import * as r from 'ramda';
import styled from 'styled-components/macro';
import { connect } from 'react-redux';
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
  const {
    Title,
    NewCasesLabel,
    TotalCasesLabel,
  } = translations[language].Charts.NewTotalCasesPerDay;

  const values = totalCasesPerDay.map((value, index) => ({
    ...value,
    r: newCasesPerDay[index].y / 50,
  }));

  const data = {
    datasets: [
      {
        type: 'bubble',
        label: NewCasesLabel,
        data: values,
        backgroundColor: 'rgba(238, 118, 76, 0.8)',
      },
      {
        type: 'line',
        label: TotalCasesLabel,
        data: totalCasesPerDay,
        pointRadius: 0,
      },
    ]
  };

  const options = {
    legend: false,
    tooltips: {
      bodyFontFamily: 'Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      titleFontFamily: 'Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      footerFontFamily: 'Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      callbacks: {
        label: (options, data) => {
          const { index, datasetIndex } = options;

          if (datasetIndex === 1) {
            return '';
          }

          const dataset = data.datasets[datasetIndex];
          const { x, y, r } = dataset.data[index];

          return `[${x}] ${TotalCasesLabel}: ${y}, ${NewCasesLabel}: ${r * 50}`;
        }
      }
    },
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
    <ChartCard title={Title}>
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
