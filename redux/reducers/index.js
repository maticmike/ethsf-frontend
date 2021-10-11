import { combineReducers } from 'redux';
import famepayFactory from './famepayFactory';
import account from './account';
import campaign from './campaign';
import jwt from './jwt';

/*
 * Combine all reducers to be consumed by the store
 */
export const reducers = { famepayFactory, account, campaign, jwt };

export default combineReducers({
  ...reducers,
});
