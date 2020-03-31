import React from 'react';
import styled from 'styled-components/macro';
import { useQuery } from "react-query";
import { Container, Row, Col } from 'react-bootstrap';

import { fetchTotalInformation } from 'Api';

import { Header, Footer } from 'Components';

import { InfoCard } from 'Components/Common';

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
};

const getPercentage = (value, totalValue) => {
  return (value / totalValue * 100).toFixed(2);
};

setTimeout(() => {
  fetchTotalInformation();
}, 2000);

const Application = () => {
  const { data } = useQuery('posts', fetchTotalInformation);

  const {
    totalCases = 0,
    activeCases = 0,
    criticalCases = 0,
    recoveredCases = 0,
    deathCases = 0,
    averageAge = 0,
    maleCount = 0,
    femaleCount = 0,
    ageGroups = {},
  } = data || {};

  return (
    <>
      <Header />

      <ContentContainer>
        <Container>
          <Row>
            <Col sm={6} lg={4} className="mt-2">
              <InfoCard
                title="Total cases"
                value={totalCases}
                timeseries={createRandomArray()}
                description={`${criticalCases} critical`}
              />
            </Col>

            <Col sm={6} lg={4} className="mt-2">
              <InfoCard
                title="Active cases"
                value={activeCases}
                timeseries={createRandomArray()}
                description={`${getPercentage(activeCases, totalCases)}% of total cases`}
              />
            </Col>

            <Col sm={6} lg={4} className="mt-2">
              <InfoCard
                title="Recovered cases"
                value={recoveredCases}
                timeseries={createRandomArray()}
                description={`${getPercentage(recoveredCases, totalCases)}% of total cases`}
              />
            </Col>

            <Col sm={6} lg={4} className="mt-2">
              <InfoCard
                title="Deaths"
                value={deathCases}
                timeseries={createRandomArray()}
                description={`${getPercentage(deathCases, totalCases)}% of total cases`}
              />
            </Col>

            <Col sm={6} lg={4} className="mt-2">
              <InfoCard
                title="Critical cases"
                value={criticalCases}
                timeseries={createRandomArray()}
                description={`${getPercentage(criticalCases, totalCases)}% of total cases`}
              />
            </Col>

            <Col sm={6} lg={4} className="mt-2">
              <InfoCard
                title="Average age"
                value={averageAge}
              />
            </Col>

            <Col lg={8} sm={7} className="mt-2">
              <AgeBarChart ageGroups={ageGroups} />
            </Col>

            <Col lg={4} sm={5} className="mt-2">
              <GenderPieChart
                maleCount={maleCount}
                femaleCount={femaleCount}
              />
            </Col>

            <Col sm={8} className="mt-2">
              <NewCasesPerDayChart />
            </Col>
          </Row>
        </Container>
      </ContentContainer>

      <Footer />
    </>
  );
}

export { Application };
