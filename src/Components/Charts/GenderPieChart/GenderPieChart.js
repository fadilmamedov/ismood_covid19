import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Doughnut } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';

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

const GenderPieChart = ({ maleCount, femaleCount }) => {
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
    <ChartCard title="Gender">
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
                title="Male"
                count={maleCount}
                totalCount={totalCount}
                color="#5e6268"
              />
            </Col>

            <Col xs={6}>
              <GenderInfo
                title="Female"
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

GenderPieChart.propTypes = {
  maleCount: types.number.isRequired,
  femaleCount: types.number.isRequired,
};

export { GenderPieChart };
