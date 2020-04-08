import axios from 'axios';
import * as r from 'ramda';

const auth = {
  username: 'fadil',
  password: 'iscov456@'
};

const BaseURL = process.env.REACT_APP_API_ENDPOINT === 'development'
  ? 'https://covidtest.ismood.com'
  : 'https://covidapi.ismood.com'

const fetchTotalInformation = async () => {
  const { data } = await axios.get(
    `${BaseURL}/total-info/?country_name=greece`,
    { auth }
  );

  const {
    total_cases: totalCases,
    active_cases: activeCases,
    total_critical: criticalCases,
    total_recovered: recoveredCases,
    total_deceased: deathCases,
    age_average: averageAge,
    average_death_age: averageDeathAge,
    total_males: maleCount,
    total_females: femaleCount,
    total_age_groups: ageGroups,
  } = data.results[0];

  return {
    totalCases,
    activeCases,
    criticalCases,
    recoveredCases,
    deathCases,
    averageAge,
    averageDeathAge,
    maleCount,
    femaleCount,
    ageGroups,
  }
};

const fetchDailyInformation = async () => {
  const { data } = await axios.get(
    `${BaseURL}/daily-info/?country_name=greece`,
    { auth }
  );

  const results = data.results.map((entry) => {
    const { date } = entry;

    const {
      to_day_cases: totalCases,
      to_day_deceased: deathCases,
      to_day_recovered: recoveredCases,
      to_day_active_cases: activeCases,
      new_cases: newCases,
    } = entry;

    return {
      date,
      totalCases,
      deathCases,
      activeCases,
      recoveredCases,
      newCases,
    };
  });

  return r.sortBy(r.prop('date'))(results);
}

const fetchRegionsInformation = async () => {
  const { data } = await axios.get(
    `${BaseURL}/regions/?country_name=greece`,
    { auth }
  );

  return data.results.map((entry) => ({
      casesCount: entry.region_cases,
      enName: entry.region_en_name,
      grName: entry.region_gr_name,
  }));
}

export {
  fetchTotalInformation,
  fetchDailyInformation,
  fetchRegionsInformation,
};
