import { createAction } from 'redux-act';

const fetchTotalInformation = createAction('[statistics] fetch total information');
const fetchTotalInformationSuccess = createAction('[statistics] fetch total information success');
const fetchDailyInformation = createAction('[statistics] fetch daily information');
const fetchDailyInformationSuccess = createAction('[statistics] fetch daily information success');

export {
  fetchTotalInformation,
  fetchTotalInformationSuccess,
  fetchDailyInformation,
  fetchDailyInformationSuccess,
};
