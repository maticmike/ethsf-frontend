import { combineReducers } from 'redux';
import account from './account';
import famepayFactory from './famepayFactory';
/*
 * Combine all reducers to be consumed by the store
 */
export const reducers = { account, famepayFactory };

export default combineReducers({
  ...reducers,
});
