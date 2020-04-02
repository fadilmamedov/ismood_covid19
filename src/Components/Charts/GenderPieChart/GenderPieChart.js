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
  const Strings = translations[language];

  const totalCount = maleCount + femaleCount;

  const data = {
    datasets: [{
      data: [maleCount, femaleCount],
      backgroundColor: ['#5e6268', '#ee774c']
    }],

    labels: [
      'Male',
      'Female',
    ]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <ChartCard title={Strings.Charts.Gender.Title}>
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
                title={Strings.Charts.Gender.MaleLabel}
                count={maleCount}
                totalCount={totalCount}
                color="#5e6268"
              />
            </Col>

            <Col xs={6}>
              <GenderInfo
                title={Strings.Charts.Gender.FemaleLabel}
                count={femaleCount}
                totalCount={totalCount}
                color="#ee774c"
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
