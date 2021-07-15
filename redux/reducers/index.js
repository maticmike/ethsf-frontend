import { combineReducers } from 'redux';
import account from './account';
import campaign from './campaign';
import famepayFactory from './famepayFactory';

/*
 * Combine all reducers to be consumed by the store
 */
export const reducers = { account, campaign, famepayFactory };

export default combineReducers({
  ...reducers,
});
