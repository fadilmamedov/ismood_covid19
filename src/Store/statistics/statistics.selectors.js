import * as r from 'ramda';

const getStatistics = r.prop('statistics');
const getTotalInformation = r.pipe(getStatistics, r.prop('totalInformation'));
const getDailyInformation = r.pipe(getStatistics, r.prop('dailyInformation'));
const getRegionsInformation = r.pipe(getStatistics, r.prop('regionsInformation'));

export {
  getTotalInformation,
  getDailyInformation,
  getRegionsInformation,
};
