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

const ChartCardFooter = styled(ChartCard.Footer)`
  display: flex;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;

  &:last-child {
    margin-left: 20px;
  }
`;

const LegendItemTitle = styled.h5`
  margin: 0;
  font-size: 16px;
  font-weight: normal;
`;

const LenendColor = styled.div`
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 7px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const getTotalCases = r.compose(
  r.sum,
  r.values
);

const getDataForCasesField = (ageGroups, fieldName) => (
  r.values(ageGroups[fieldName]).map(value => value / getTotalCases(ageGroups[fieldName]) * 100)
);

const AgeBarChartBase = ({ language, ageGroups, averageAge }) => {
  const {
    Title: ChartTitle,
    AverageAgeLabel,
    Fields,
  } = translations[language].Charts.Age;

  const labels = r.pipe(
    r.keys,
    r.sort((a, b) => parseInt(a) - parseInt(b))
  )(ageGroups.cases);

  const data = {
    labels,
    datasets: [
      {
        label: Fields.Cases,
        data: getDataForCasesField(ageGroups, 'cases'),
        backgroundColor: '#ee774c'
      },
      {
        label: Fields.Deaths,
        data: getDataForCasesField(ageGroups, 'deaths'),
        backgroundColor: '#5e6168'
      },
    ]
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

          return `${dataset.label}: ${percentageValue.toFixed(2)}%`;
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

      <ChartCardFooter>
        <LegendItem>
          <LenendColor color="#ee774c" />

          <LegendItemTitle>
            {Fields.Cases}
          </LegendItemTitle>
        </LegendItem>

        <LegendItem>
          <LenendColor color="#5e6168" />

          <LegendItemTitle>
            {Fields.Deaths}
          </LegendItemTitle>
        </LegendItem>
      </ChartCardFooter>
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
