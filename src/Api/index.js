import axios from 'axios';

const fetchTotalInformation = async () => {
  const { data } = await axios.get('https://covidapi.ismood.com/total-info/?country_name=greece', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ZmFkaWw6aXNjb3Y0NTZA',
    }
  });

  // console.log('[user]', { data });

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

export { fetchTotalInformation };
