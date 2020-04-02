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

  const data = {
    labels: r.keys(ageGroups),
    datasets: [{
      data: r.values(ageGroups),
      backgroundColor: '#ee774c'
    }]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
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
