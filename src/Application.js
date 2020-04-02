import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { actions, selectors } from 'Store';
import * as translations from 'Assets/Translations';

import { Header, Footer, PageContainer } from 'Components';

import {
  SetDefaults,
  AgeBarChart,
  GenderPieChart,
  CasesLineChart,
  CasesPerDayChart,
  CasesPerDayBubbleChart,
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
  language,
  totalInformation,
  dailyInformation,
  fetchTotalInformation,
  fetchDailyInformation,
}) => {
  const Strings = translations[language];

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
                      title={Strings.Cards.TotalCases.Title}
                      value={totalCases}
                      timeseries={dailyInformation.map(r.prop('totalCases'))}
                      description={(
                        <CriticalValue>
                          {criticalCases} {Strings.Cards.TotalCases.CriticalCasesLabel}
                        </CriticalValue>
                      )}
                    />
                  </ChartLink>
                </Col>

                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/active-cases">
                    <InfoCard
                      title={Strings.Cards.ActiveCases.Title}
                      value={activeCases}
                      timeseries={dailyInformation.map(r.prop('activeCases'))}
                      description={`
                        ${getPercentage(activeCases, totalCases)}%
                        ${Strings.Cards.ActiveCases.TotalCasesPercentLabel}
                      `}
                    />
                  </ChartLink>
                </Col>

                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/recovered-cases">
                    <InfoCard
                      title={Strings.Cards.RecoveredCases.Title}
                      value={recoveredCases}
                      valueColor="green"
                      timeseries={dailyInformation.map(r.prop('recoveredCases'))}
                      description={`
                        ${getPercentage(recoveredCases, totalCases)}%
                        ${Strings.Cards.RecoveredCases.TotalCasesPercentLabel}
                      `}
                    />
                  </ChartLink>
                </Col>

                <Col sm={6} lg={3} className="mt-2">
                  <ChartLink to="/death-cases">
                    <InfoCard
                      title={Strings.Cards.DeathCases.Title}
                      value={deathCases}
                      valueColor="#da1e1e"
                      timeseries={dailyInformation.map(r.prop('deathCases'))}
                      description={`
                        ${getPercentage(deathCases, totalCases)}%
                        ${Strings.Cards.DeathCases.TotalCasesPercentLabel}
                      `}
                    />
                  </ChartLink>
                </Col>

                <Col xs={12} className="mt-2">
                  <CasesPerDayBubbleChart
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
            <PageContainer title={Strings.Pages.TotalCases.Title}>
              <CasesLineChart
                values={dailyInformation.map((entry) => ({
                  x: entry.date,
                  y: entry.totalCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/active-cases" exact>
            <PageContainer title={Strings.Pages.ActiveCases.Title}>
              <CasesLineChart
                values={dailyInformation.map((entry) => ({
                  x: entry.date,
                  y: entry.activeCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/recovered-cases" exact>
            <PageContainer title={Strings.Pages.RecoveredCases.Title}>
              <CasesLineChart
                values={dailyInformation.map((entry) => ({
                  x: entry.date,
                  y: entry.recoveredCases,
                }))}
              />
            </PageContainer>
          </Route>

          <Route path="/death-cases" exact>
            <PageContainer title={Strings.Pages.DeathCases.Title}>
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
  language: types.string.isRequired,
  fetchTotalInformation: types.func.isRequired,
  fetchDailyInformation: types.func.isRequired,
};

const {
  getLanguage,
} = selectors.app;

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
      language: getLanguage,
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
