import { createReducer } from 'redux-act';

import {
  setLanguage,
} from './app.actions';

const initialState = {
  language: 'gr',
};

const reducer = {
  [setLanguage]: (state, language) => ({
    ...state,
    language,
  }),
};

export const appReducer = createReducer(reducer, initialState);
