import axios from 'axios';
import * as r from 'ramda';

const auth = {
  username: 'fadil',
  password: 'iscov456@'
};

const fetchTotalInformation = async () => {
  const { data } = await axios.get(
    'https://covidapi.ismood.com/total-info/?country_name=greece',
    { auth }
  );

  const {
    total_cases: totalCases,
    active_cases: activeCases,
    total_critical: criticalCases,
    total_recovered: recoveredCases,
    total_deceased: deathCases,
    age_average: averageAge,
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
    maleCount,
    femaleCount,
    ageGroups,
  }
};

const fetchDailyInformation = async () => {
  const { data } = await axios.get(
    'https://covidapi.ismood.com/daily-info/?country_name=greece',
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

export { fetchTotalInformation, fetchDailyInformation };
