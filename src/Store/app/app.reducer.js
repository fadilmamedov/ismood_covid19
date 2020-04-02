import { createReducer } from 'redux-act';

import {
  setLanguage,
} from './app.actions';

const initialState = {
  language: 'en',
};

const reducer = {
  [setLanguage]: (state, language) => ({
    ...state,
    language,
  }),
};

export const appReducer = createReducer(reducer, initialState);
