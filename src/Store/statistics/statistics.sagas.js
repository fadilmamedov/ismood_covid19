import * as r from 'ramda';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import * as api from 'Api';

import {
  fetchTotalInformation,
  fetchTotalInformationSuccess,
  fetchDailyInformation,
  fetchDailyInformationSuccess,
  fetchRegionsInformation,
  fetchRegionsInformationSuccess,
} from './statistics.actions';

import {
  getTotalInformation,
} from './statistics.selectors';

const fetchTotalInformationSaga = function* () {
  const totalInformation = yield call(api.fetchTotalInformation);
  yield put(fetchTotalInformationSuccess(totalInformation));
};

const fetchDailyInformationSaga = function* () {
  const dailyInformation = yield call(api.fetchDailyInformation);
  yield put(fetchDailyInformationSuccess(dailyInformation));

  const lastEntry = r.last(dailyInformation);
  const { totalCases, activeCases, recoveredCases, deathCases } = lastEntry;

  const totalInformation = {
    ...yield select(getTotalInformation),
    totalCases,
    activeCases,
    recoveredCases,
    deathCases,
  };

  yield put(fetchTotalInformationSuccess(totalInformation));
};

const fetchRegionsInformationSaga = function* () {
  const regionsInformation = yield call(api.fetchRegionsInformation);
  yield put(fetchRegionsInformationSuccess(regionsInformation));
};

const statisticsSaga = function* () {
  yield takeLatest(fetchTotalInformation, fetchTotalInformationSaga);
  yield takeLatest(fetchDailyInformation, fetchDailyInformationSaga);
  yield takeLatest(fetchRegionsInformation, fetchRegionsInformationSaga);
};

export { statisticsSaga };
