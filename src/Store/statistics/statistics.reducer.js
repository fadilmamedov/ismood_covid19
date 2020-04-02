import { createReducer } from 'redux-act';

import {
  fetchTotalInformationSuccess,
  fetchDailyInformationSuccess,
  fetchRegionsInformationSuccess,
} from './statistics.actions';

const initialState = {
  totalInformation: {},
  dailyInformation: [],
  regionsInformation: [],
};

const reducer = {
  [fetchTotalInformationSuccess]: (state, totalInformation) => ({
    ...state,
    totalInformation,
  }),

  [fetchDailyInformationSuccess]: (state, dailyInformation) => ({
    ...state,
    dailyInformation,
  }),

  [fetchRegionsInformationSuccess]: (state, regionsInformation) => ({
    ...state,
    regionsInformation
  })
};

export const statisticsReducer = createReducer(reducer, initialState);
