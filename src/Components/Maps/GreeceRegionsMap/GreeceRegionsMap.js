import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { selectors } from 'Store';
import * as translations from 'Assets/Translations';

import { ChartCard } from 'Components/Common';

import { MapRegion } from './MapRegion';
import { Regions as regions } from './GreeceRegionMap.Regions';

const RegionEntry = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const CasesCount = styled.span`
  font-weight: 500;
`;

const sortRegionsInformation = (regionsInformation) => {
  const knownRegions = regionsInformation.filter(region => region.enName !== 'Uknown Location');
  const unknownRegions = regionsInformation.filter(region => region.enName === 'Uknown Location');

  const sortByCasesCount = r.sortBy(r.prop('casesCount'));

  return [...sortByCasesCount(knownRegions).reverse(), ...unknownRegions];
};

const GreeceRegionsMapBase = ({ language, regionsInformation }) => {
  const [selectedRegion, setSelectedRegion] = React.useState(null);

  const { Title } = translations[language].Maps.Greece;

  const regionsInformationObject = {};
  regionsInformation.forEach((regionInformation) => {
    regionsInformationObject[regionInformation.enName] = regionInformation;
  });

  const maxCasesCount = regionsInformation.length > 0
    ? Math.max(...regionsInformation.map(r.prop('casesCount')))
    : 1;

  const handleRegionMouseOver = React.useCallback((regionName) => () => {
    setSelectedRegion(regionName);
  }, [setSelectedRegion])

  return (
    <ChartCard title={Title}>
      <ChartCard.Body>
        <Container>
          <Row>
            <Col lg={8}>
              <svg
                width="100%"
                viewBox="0 0 918 792"
              >
                {r.keys(regions).map((title) => {
                  const { casesCount = 0 } = regionsInformationObject[title] || {};

                  return (
                    <MapRegion
                      key={title}
                      title={title}
                      casesCount={casesCount}
                      maxCasesCount={maxCasesCount}
                      selected={selectedRegion === title}
                    />
                  );
                })}
              </svg>
            </Col>

            <Col lg={4}>
              {sortRegionsInformation(regionsInformation).map(({ casesCount, enName, grName }) => (
                <RegionEntry key={enName} onMouseOver={handleRegionMouseOver(enName)}>
                  {language === 'en' ? enName : grName}

                  <CasesCount>
                    {casesCount}
                  </CasesCount>
                </RegionEntry>
              ))}
            </Col>
          </Row>
        </Container>

      </ChartCard.Body>
    </ChartCard>
  );
};

GreeceRegionsMapBase.propTypes = {
  language: types.string.isRequired,
  regionsInformation: types.arrayOf(types.shape({
    casesCount: types.number.isRequired,
    enName: types.string.isRequired,
    grName: types.string.isRequired,
  })),
};

const {
  getLanguage,
} = selectors.app;

const GreeceRegionsMap = r.compose(
  connect(
    r.applySpec({
      language: getLanguage,
    })
  )
)(GreeceRegionsMapBase);

export { GreeceRegionsMap };
