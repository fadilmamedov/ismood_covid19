import React from 'react';
import * as r from 'ramda';
import styled from 'styled-components/macro';
import { useQuery } from "react-query";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import {
  fetchTotalInformation,
  fetchDailyInformation,
} from 'Api';

import { Header, Footer, PageContainer } from 'Components';

import { InfoCard as InfoCardBase } from 'Components/Common';

import {
  SetDefaults,
  AgeBarChart,
  GenderPieChart,
  CasesLineChart,
  CasesPerDayChart,
} from 'Components/Charts';

const ContentContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
`;

const CriticalValue = styled.span`
  color: #da1e1e;
`;

const InfoCard = styled(InfoCardBase)`
  border: 0;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, .15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, .1), 0 2px 4px rgba(16, 22, 26, .2), 0 8px 24px rgba(16, 22, 26, .2)
  }
`;

const ChartLink = styled(Link)`
  color: black;

  &:hover {
    color: black;
    text-decoration: none;
  }
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
    <BrowserRouter>
      <Header />

      <ContentContainer className="content-container">
        <Switch>
          <Route path="/" exact>
            <Container>
              <Row>
                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/total-cases">
                    <InfoCard
                      title="Total cases"
                      value={totalCases}
                      timeseries={dailyData.map(r.prop('totalCases'))}
                      description={(
                        <>
                          <CriticalValue>
                            {criticalCases} {' '}
                          </CriticalValue>
                          critical
                        </>
                      )}
                    />
                  </ChartLink>
                </Col>

                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/active-cases">
                    <InfoCard
                      title="Active cases"
                      value={activeCases}
                      timeseries={dailyData.map(r.prop('activeCases'))}
                      description={`${getPercentage(activeCases, totalCases)}% of total cases`}
                    />
                  </ChartLink>
                </Col>

                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/recovered-cases">
                    <InfoCard
                      title="Recovered cases"
                      value={recoveredCases}
                      valueColor="green"
                      timeseries={dailyData.map(r.prop('recoveredCases'))}
                      description={`${getPercentage(recoveredCases, totalCases)}% of total cases`}
                    />
                  </ChartLink>
                </Col>

                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/death-cases">
                    <InfoCard
                      title="Deaths"
                      value={deathCases}
                      valueColor="#da1e1e"
                      timeseries={dailyData.map(r.prop('deathCases'))}
                      description={`${getPercentage(deathCases, totalCases)}% of total cases`}
                    />
                  </ChartLink>
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
          </Route>

          <Route path="/total-cases" exact>
            <PageContainer title="Total cases">
              <CasesLineChart
                values={dailyData.map((entry) => ({
                  x: entry.date,
                  y: entry.totalCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/active-cases" exact>
            <PageContainer title="Active cases">
              <CasesLineChart
                values={dailyData.map((entry) => ({
                  x: entry.date,
                  y: entry.activeCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/recovered-cases" exact>
            <PageContainer title="Recovered cases">
              <CasesLineChart
                values={dailyData.map((entry) => ({
                  x: entry.date,
                  y: entry.recoveredCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/death-cases" exact>
            <PageContainer title="Deaths">
              <CasesLineChart
                values={dailyData.map((entry) => ({
                  x: entry.date,
                  y: entry.deathCases,
                }))}
              />
            </PageContainer>
          </Route>
        </Switch>
      </ContentContainer>

      <Footer />
    </BrowserRouter>
  );
}

export { Application };
