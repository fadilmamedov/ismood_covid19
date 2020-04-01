import { createReducer } from 'redux-act';

import {
  fetchTotalInformationSuccess,
  fetchDailyInformationSuccess,
} from './statistics.actions';

const initialState = {
  totalInformation: {},
  dailyInformation: [],
};

const reducer = {
  [fetchTotalInformationSuccess]: (state, totalInformation) => ({
    ...state,
    totalInformation,
  }),

  [fetchDailyInformationSuccess]: (state, dailyInformation) => ({
    ...state,
    dailyInformation,
  })
};

export const statisticsReducer = createReducer(reducer, initialState);
