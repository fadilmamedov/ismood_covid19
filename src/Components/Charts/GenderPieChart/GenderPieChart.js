import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Doughnut } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';

import { selectors } from 'Store';
import * as translations from 'Assets/Translations';

import { ChartCard as ChartCardBase } from 'Components/Common';
import { GenderInfo as GenderInfoBase } from './GenderInfo';

const ChartCard = styled(ChartCardBase)`
  height: 400px;
`;

const ChartCardBody = styled(ChartCard.Body)`
  height: 300px;

  @media screen and (max-width: 768px) {
    height: 200px;
  }
`;

const GenderInfo = styled(GenderInfoBase)`
  @media screen and (max-width: 575px) {
    margin-top: 10px;
  }
`;

const GenderPieChartBase = ({ language, maleCount, femaleCount }) => {
  const { Title, MaleLabel, FemaleLabel } = translations[language].Charts.Gender;

  const totalCount = maleCount + femaleCount;

  const data = {
    datasets: [{
      data: [maleCount, femaleCount],
      backgroundColor: ['#5e6268', '#ee774c']
    }],

    labels: [
      MaleLabel,
      FemaleLabel,
    ]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: (options, data) => {
          const { index } = options;
          const label = data.labels[index];
          const value = data.datasets[0].data[index];

          const percentage = (value / totalCount * 100).toFixed(2);

          return ` ${label}: ${percentage}%`;
        }
      }
    }
  };

  return (
    <ChartCard title={Title}>
      <ChartCardBody>
        <Doughnut
          data={data}
          options={options}
        />
      </ChartCardBody>

      <ChartCard.Footer>
        <Container>
          <Row>
            <Col xs={6}>
              <GenderInfo
                title={FemaleLabel}
                count={femaleCount}
                totalCount={totalCount}
                color="#ee774c"
              />
            </Col>

            <Col xs={6}>
              <GenderInfo
                title={MaleLabel}
                count={maleCount}
                totalCount={totalCount}
                color="#5e6268"
              />
            </Col>
          </Row>
        </Container>
      </ChartCard.Footer>
    </ChartCard>
  );
}

GenderPieChartBase.propTypes = {
  language: types.string.isRequired,
  maleCount: types.number.isRequired,
  femaleCount: types.number.isRequired,
};

const {
  getLanguage,
} = selectors.app;

const GenderPieChart = r.compose(
  connect(
    r.applySpec({
      language: getLanguage,
    })
  )
)(GenderPieChartBase);

export { GenderPieChart };
