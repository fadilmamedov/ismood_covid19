import React from 'react';
import styled from 'styled-components/macro';
import { Container, Row, Col } from 'react-bootstrap';

import { Header, Footer } from 'Components';

import { InfoCard } from 'Components/Common';
import { AverageAgeInfoCard } from 'Components/Cards';

import {
  SetDefaults,
  AgeBarChart,
  GenderPieChart,
  NewCasesPerDayChart,
} from 'Components/Charts';

const ContentContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
`;

SetDefaults();

const createRandomArray = () => {
  return [...Array(50)].map(() => Math.floor(Math.random() * 30) + 1);
}

const Application = () => (
  <>
    <Header />

    <ContentContainer>
      <Container>
        <Row>
          <Col sm={6} lg={3} className="mt-2">
            <InfoCard
              title="Total cases"
              value={844}
              timeseries={createRandomArray()}
              description="19 critical"
            />
          </Col>

          <Col sm={6} lg={3} className="mt-2">
            <InfoCard
              title="Active cases"
              value={629}
              timeseries={createRandomArray()}
              description="74.5% of total cases"
            />
          </Col>

          <Col sm={6} lg={3} className="mt-2">
            <InfoCard
              title="Recovered cases"
              value={629}
              timeseries={createRandomArray()}
              description="22% of total cases"
            />
          </Col>

          <Col sm={6} lg={3} className="mt-2">
            <InfoCard
              title="Deaths"
              value={132}
              timeseries={createRandomArray()}
              description="4% of total cases"
            />
          </Col>
        </Row>

        <Row>
          <Col sm={4} lg={3} className="mt-2">
            <InfoCard
              title="Critical cases"
              value={17}
              description="2% of total cases"
            />
          </Col>

          <Col sm={8} lg={9} className="mt-2">
            <AverageAgeInfoCard
              values={{
                all: 37,
                active: 23,
                recovered: 21,
                deaths: 75,
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={8} sm={7} className="mt-2">
            <AgeBarChart />
          </Col>

          <Col lg={4} sm={5} className="mt-2">
            <GenderPieChart
              maleCount={478}
              femaleCount={366}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={8} className="mt-2">
            <NewCasesPerDayChart />
          </Col>
        </Row>
      </Container>
    </ContentContainer>

    <Footer />
  </>
)

export { Application };
