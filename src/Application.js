import React from 'react';
import * as r from 'ramda';
import styled from 'styled-components/macro';
import { useQuery } from "react-query";
import { Container, Row, Col } from 'react-bootstrap';

import {
  fetchTotalInformation,
  fetchDailyInformation,
} from 'Api';

import { Header, Footer } from 'Components';

import { InfoCard } from 'Components/Common';

import {
  SetDefaults,
  AgeBarChart,
  GenderPieChart,
  CasesPerDayChart,
} from 'Components/Charts';

const ContentContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
`;

SetDefaults();

const getPercentage = (value, totalValue) => {
  return (value / totalValue * 100).toFixed(2);
};

const Application = () => {
  const { data: totalData } = useQuery('total-info', fetchTotalInformation);
  const { data: dailyData = [] } = useQuery('daily-info', fetchDailyInformation);

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
  } = totalData || {};

  return (
    <>
      <Header />

      <ContentContainer className="content-container">
        <Container>
          <Row>
            <Col sm={6} lg={3} className="mt-2">
              <InfoCard
                title="Total cases"
                value={totalCases}
                timeseries={dailyData.map(r.prop('totalCases'))}
                description={`${criticalCases} critical`}
              />
            </Col>

            <Col sm={6} lg={3} className="mt-2">
              <InfoCard
                title="Active cases"
                value={activeCases}
                timeseries={dailyData.map(r.prop('activeCases'))}
                description={`${getPercentage(activeCases, totalCases)}% of total cases`}
              />
            </Col>

            <Col sm={6} lg={3} className="mt-2">
              <InfoCard
                title="Recovered cases"
                value={recoveredCases}
                valueColor="green"
                timeseries={dailyData.map(r.prop('recoveredCases'))}
                description={`${getPercentage(recoveredCases, totalCases)}% of total cases`}
              />
            </Col>

            <Col sm={6} lg={3} className="mt-2">
              <InfoCard
                title="Deaths"
                value={deathCases}
                valueColor="#da1e1e"
                timeseries={dailyData.map(r.prop('deathCases'))}
                description={`${getPercentage(deathCases, totalCases)}% of total cases`}
              />
            </Col>

            <Col xs={12} className="mt-2">
              <CasesPerDayChart
                newCasesPerDay={dailyData.map(entry => ({
                  x: entry.date,
                  y: entry.newCases,
                }))}
                totalCasesPerDay={dailyData.map(entry => ({
                  x: entry.date,
                  y: entry.totalCases,
                }))}
              />
            </Col>

            <Col lg={8} sm={7} className="mt-2">
              <AgeBarChart
                ageGroups={ageGroups}
                averageAge={averageAge}
              />
            </Col>

            <Col lg={4} sm={5} className="mt-2">
              <GenderPieChart
                maleCount={maleCount}
                femaleCount={femaleCount}
              />
            </Col>
          </Row>
        </Container>
      </ContentContainer>

      <Footer />
    </>
  );
}

export { Application };
