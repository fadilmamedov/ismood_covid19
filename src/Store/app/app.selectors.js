import * as r from 'ramda';

const getApp = r.prop('app');
const getLanguage = r.pipe(getApp, r.prop('language'));

export {
  getLanguage,
};
