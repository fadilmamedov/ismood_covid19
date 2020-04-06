import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { selectors } from 'Store';
import * as translations from 'Assets/Translations';

import { ChartCard } from 'Components/Common';

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartCardBody = styled(ChartCard.Body)`
  height: 300px;

  @media screen and (min-width: 767px) {
    height: 200px;
  }
`;

const AgeBarChartBase = ({ language, ageGroups, averageAge }) => {
  const { Title: ChartTitle, AverageAgeLabel } = translations[language].Charts.Age;

  const labels = r.pipe(
    r.keys,
    r.sort((a, b) => parseInt(a) - parseInt(b))
  )(ageGroups);

  const totalCases = r.compose(
    r.sum,
    r.values
  )(ageGroups);

  const data = {
    labels,
    datasets: [{
      data: r.values(ageGroups).map(value => value / totalCases * 100),
      backgroundColor: '#ee774c'
    }]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: (options, data) => {
          const { index, datasetIndex } = options;
          const dataset = data.datasets[datasetIndex];
          const percentageValue = dataset.data[index];

          return `${percentageValue.toFixed(2)}%`;
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
        }
      }]
    }
  };

  const title = (
    <Title>
      <span>{ChartTitle}</span>

      <span>{AverageAgeLabel}: {averageAge.toFixed(1)}</span>
    </Title>
  );

  return (
    <ChartCard title={title}>
      <ChartCardBody>
        <Bar
          data={data}
          options={options}
        />
      </ChartCardBody>
    </ChartCard>
  )
};

AgeBarChartBase.propTypes = {
  ageGroups: types.objectOf(types.number).isRequired,
  averageAge: types.number.isRequired,
};

const {
  getLanguage,
} = selectors.app;

const AgeBarChart = r.compose(
  connect(
    r.applySpec({
      language: getLanguage,
    })
  )
)(AgeBarChartBase);

export { AgeBarChart };
