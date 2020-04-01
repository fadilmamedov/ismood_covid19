import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';

import { statisticsSaga } from './statistics/statistics.sagas';
import { statisticsReducer } from './statistics/statistics.reducer';
import * as statisticsActions from './statistics/statistics.actions';
import * as statisticsSelectors from './statistics/statistics.selectors';

const isDevelopmentMode = process.env.NODE_ENV === 'development';

const rootReducer = combineReducers({
  statistics: statisticsReducer,
});

const actions = {
  statistics: statisticsActions,
};

const selectors = {
  statistics: statisticsSelectors,
};

const rootSaga = function* () {
  yield all([
    statisticsSaga(),
  ]);
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, compose(
  applyMiddleware(sagaMiddleware),
  // eslint-disable-next-line no-underscore-dangle
  isDevelopmentMode && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

sagaMiddleware.run(rootSaga);

export { store, actions, selectors };
