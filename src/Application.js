import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { actions, selectors } from 'Store';

import { Header, Footer, PageContainer } from 'Components';

import {
  SetDefaults,
  AgeBarChart,
  GenderPieChart,
  CasesLineChart,
  CasesPerDayChart,
} from 'Components/Charts';

import {
  InfoCard,
  ChartLink,
  CriticalValue,
  ContentContainer,
} from './Application.Components';

SetDefaults();

const getPercentage = (value, totalValue) => {
  return (value / totalValue * 100).toFixed(2);
};

const ApplicationBase = ({
  totalInformation,
  dailyInformation,
  fetchTotalInformation,
  fetchDailyInformation,
}) => {
  React.useEffect(() => {
    fetchTotalInformation();
    fetchDailyInformation();
  }, [fetchTotalInformation, fetchDailyInformation]);

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
  } = totalInformation;

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
                      timeseries={dailyInformation.map(r.prop('totalCases'))}
                      description={(
                        <CriticalValue>
                          {criticalCases} critical
                        </CriticalValue>
                      )}
                    />
                  </ChartLink>
                </Col>

                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/active-cases">
                    <InfoCard
                      title="Active cases"
                      value={activeCases}
                      timeseries={dailyInformation.map(r.prop('activeCases'))}
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
                      timeseries={dailyInformation.map(r.prop('recoveredCases'))}
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
                      timeseries={dailyInformation.map(r.prop('deathCases'))}
                      description={`${getPercentage(deathCases, totalCases)}% of total cases`}
                    />
                  </ChartLink>
                </Col>

                <Col xs={12} className="mt-2">
                  <CasesPerDayChart
                    newCasesPerDay={dailyInformation.map(entry => ({
                      x: entry.date,
                      y: entry.newCases,
                    }))}
                    totalCasesPerDay={dailyInformation.map(entry => ({
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
                values={dailyInformation.map((entry) => ({
                  x: entry.date,
                  y: entry.totalCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/active-cases" exact>
            <PageContainer title="Active cases">
              <CasesLineChart
                values={dailyInformation.map((entry) => ({
                  x: entry.date,
                  y: entry.activeCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/recovered-cases" exact>
            <PageContainer title="Recovered cases">
              <CasesLineChart
                values={dailyInformation.map((entry) => ({
                  x: entry.date,
                  y: entry.recoveredCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/death-cases" exact>
            <PageContainer title="Deaths">
              <CasesLineChart
                values={dailyInformation.map((entry) => ({
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
};

ApplicationBase.propTypes = {
  fetchTotalInformation: types.func.isRequired,
  fetchDailyInformation: types.func.isRequired,
};

const {
  fetchTotalInformation,
  fetchDailyInformation,
} = actions.statistics;

const {
  getTotalInformation,
  getDailyInformation,
} = selectors.statistics;

const Application = r.compose(
  connect(
    r.applySpec({
      totalInformation: getTotalInformation,
      dailyInformation: getDailyInformation,
    }),
    {
      fetchTotalInformation,
      fetchDailyInformation,
    },
  )
)(ApplicationBase);

export { Application };
