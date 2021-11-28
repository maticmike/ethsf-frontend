import { combineReducers } from 'redux';
import famepayFactory from './famepayFactory';
import account from './account';
import campaign from './campaign';

/*
 * Combine all reducers to be consumed by the store
 */
export const reducers = { famepayFactory, account, campaign };

export default combineReducers({
  ...reducers,
});
